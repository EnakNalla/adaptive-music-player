import { runInAction } from 'mobx';
import ConfigStore from './configStore/ConfigStore';
import PlayerStore from './playerStore/playerStore';

export default class RootStore {
  loading = true;

  playerStore: PlayerStore;
  configStore: ConfigStore;

  constructor() {
    this.playerStore = new PlayerStore(this);
    this.configStore = new ConfigStore(this);
  }

  initData = async () => {
    const timers = await window.api.getTimers();
    const configs = await window.api.getConfigs();

    runInAction(() => {
      this.configStore.savedConfigs = configs;
      this.configStore.timers = timers;
      this.playerStore.timer = timers.find(t => t.isDefault)!;
    });
  };
}
