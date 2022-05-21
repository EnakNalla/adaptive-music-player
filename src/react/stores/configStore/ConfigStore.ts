import { makeAutoObservable } from 'mobx';
import RootStore from '../rootStore';

const DEFAULT_COLOURS = {
  primary: '#d92027',
  secondary: '#ff9234',
  tertiary: '#ffcd3c',
  quaternary: '#35d0ba',
  background: '#000000'
};

export default class ConfigStore {
  inputOptions: InputOptions = {
    size: 'medium',
    dwellTime: 1,
    fixedPosition: false
  };
  visualiserOptions: VisualiserOptions = {
    type: 'cubes',
    stroke: 2,
    colours: DEFAULT_COLOURS
  };
  timers: Timer[] = [];
  savedConfigs: SavedConfig[] = [];

  constructor(private root: RootStore) {
    makeAutoObservable(this);
  }

  get songs() {
    return this.root.playerStore.songs;
  }

  setInputOption = (key: keyof InputOptions, value: any) => {
    (this.inputOptions[key] as any) = value;
  };

  setVisualiserOption = (key: VisualiserOptionKeys, value: any, colour?: boolean) => {
    if (colour) {
      // @ts-ignore
      this.visualiserOptions.colours[key] = value;
      return;
    }

    // @ts-ignore
    this.visualiserOptions[key] = value;
  };

  addTimer = (timer: Timer) => {
    if (this.timers.some(t => t.name === timer.name)) {
      throw new Error(`timer ${timer.name} already exists`);
    }

    if (timer.isDefault) {
      this.timers.find(t => t.isDefault)!.isDefault = false;
    }

    this.timers.push(timer);

    this.saveTimers();
  };

  changeDefaultTimer = (name: string) => {
    this.timers.find(t => t.isDefault)!.isDefault = false;
    this.timers.find(t => t.name === name)!.isDefault = true;

    this.saveTimers();
  };

  removeTimer = (timer: Timer) => {
    if (timer.isDefault) {
      this.timers.find(t => t.name === '30 seconds')!.isDefault = true;
    }

    const index = this.timers.findIndex(t => t.name === timer.name);
    this.timers.splice(index, 1);

    this.saveTimers();
  };

  private saveTimers = () => {
    window.api.saveTimers(JSON.parse(JSON.stringify(this.timers)));
  };

  saveConfig = (name: string, update?: boolean) => {
    if (!update && this.savedConfigs.some(c => c.name === name)) {
      throw new Error(`config ${name} already exists`);
    }

    this.savedConfigs.push({
      name,
      songs: this.songs,
      inputOptions: this.inputOptions,
      visualiserOptions: this.visualiserOptions
    });

    window.api.saveConfigs(JSON.parse(JSON.stringify(this.savedConfigs)));
  };

  removeConfig = (name: string) => {
    const index = this.savedConfigs.findIndex(c => c.name === name);
    this.savedConfigs.splice(index, 1);

    window.api.saveConfigs(JSON.parse(JSON.stringify(this.savedConfigs)));
  };
}
