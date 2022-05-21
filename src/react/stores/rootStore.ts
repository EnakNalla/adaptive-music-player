import { action, makeObservable, observable, runInAction } from 'mobx';
import ConfigStore from './configStore/ConfigStore';
import PlayerStore from './playerStore/playerStore';

export default class RootStore {
  loading = true;

  playerStore: PlayerStore;
  configStore: ConfigStore;

  constructor() {
    this.playerStore = new PlayerStore(this);
    this.configStore = new ConfigStore(this);

    makeObservable(this, { loading: observable, initData: action });
  }

  initData = async () => {
    const timers = await window.api.getTimers();
    const configs = await window.api.getConfigs();

    const initialConfig = configs.find(c => c.loadOnInit);

    runInAction(() => {
      this.configStore.savedConfigs = configs;
      this.configStore.timers = timers;
      if (initialConfig) this.configStore.loadConfig(initialConfig);
      this.playerStore.timer = timers.find(t => t.isDefault)!;

      this.loading = false;
    });
  };
}
