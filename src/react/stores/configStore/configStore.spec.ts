import { timerStub } from '@test-utils/stubs/timerStub';
import RootStore from '../rootStore';
import ConfigStore from './ConfigStore';

describe('ConfigStore', () => {
  let configStore: ConfigStore;

  beforeEach(() => {
    configStore = new RootStore().configStore;
  });

  describe('setInputOption', () => {
    it('should set input option to value', () => {
      configStore.setInputOption('dwellTime', 5);

      expect(configStore.inputOptions.dwellTime).toBe(5);
    });
  });

  describe('setVisualiserOption', () => {
    it('should set visualiser option to value', () => {
      configStore.setVisualiserOption('stroke', 20);

      expect(configStore.visualiserOptions.stroke).toBe(20);
    });

    it('should set colour option to value when colour is true', () => {
      configStore.setVisualiserOption('primary', '#eaeaea', true);

      expect(configStore.visualiserOptions.colours.primary).toBe('#eaeaea');
    });
  });

  describe('resetColours', () => {
    it('should set visualiser colours to defaults', () => {
      configStore.visualiserOptions.colours.primary = '#eaeaea';

      configStore.resetColours();

      expect(configStore.visualiserOptions.colours.primary).toBe('#d92027');
    });
  });

  describe('addTimer', () => {
    it('should add a timer to timers', () => {
      const timer = timerStub(false);

      configStore.addTimer(timer);

      expect(configStore.timers).toEqual([timer]);
    });

    it('should throw an error if timer with name exists', () => {
      const timer = timerStub(false);
      configStore.timers = [timer];

      expect(() => configStore.addTimer(timer)).toThrowError(`timer ${timer.name} already exists`);
    });

    it('should set current default to false when new timer isDefault', () => {
      const timer = timerStub();
      const newTimer = timerStub();
      newTimer.name = 'default';
      configStore.timers = [timer];

      configStore.addTimer(newTimer);

      timer.isDefault = false;
      expect(configStore.timers).toEqual([timer, newTimer]);
    });
  });

  describe('changeDefaultTimer', () => {
    it('should set current default to false and set passed in timer isDefault', () => {
      const timer = timerStub();
      const newDefault = timerStub(false);
      newDefault.name = 'default';
      configStore.timers = [timer, newDefault];

      configStore.changeDefaultTimer(newDefault.name);

      timer.isDefault = false;
      newDefault.isDefault = true;
      expect(configStore.timers).toEqual([timer, newDefault]);
    });
  });

  describe('removeTimer', () => {
    it('should remove timer from timers', () => {
      const timer = timerStub(false);
      configStore.timers = [timer];

      configStore.removeTimer(timer);

      expect(configStore.timers).toEqual([]);
    });

    it('should set timer "30 seconds" to default if deleted timer isDefault', () => {
      const timer30 = { name: '30 seconds', playtime: 0, isDefault: false };
      const timer = timerStub();
      configStore.timers = [timer, timer30];

      configStore.removeTimer(timer);

      timer30.isDefault = true;
      expect(configStore.timers).toEqual([timer30]);
    });
  });

  describe('saveConfig', () => {
    it('should add config to savedConfigs', () => {
      configStore.saveConfig('test');

      expect(window.api.saveConfigs).toHaveBeenCalled();
    });

    it('should throw error when config with name exists', () => {
      // @ts-ignore
      configStore.savedConfigs = [{ name: 'test' }];

      expect(() => configStore.saveConfig('test')).toThrowError('config test already exists');
    });

    it('should set current loadOnInit to false when loadOnInit is true', () => {
      // @ts-ignore
      configStore.savedConfigs = [{ name: 'test', loadOnInit: true }];

      configStore.saveConfig('testing', true);

      expect(configStore.savedConfigs[0]).toMatchObject({ name: 'test', loadOnInit: false });
      expect(configStore.savedConfigs[1]).toMatchObject({ name: 'testing', loadOnInit: true });
    });
  });

  describe('updateLoadOnInit', () => {
    it('should set savedConfig.loadOnInit to true', () => {
      // @ts-ignore
      configStore.savedConfigs = [{ name: 'test', loadOnInit: false }];

      configStore.updateLoadOnInit('test', true);

      expect(window.api.saveConfigs).toHaveBeenCalledWith([{ name: 'test', loadOnInit: true }]);
    });

    it('should set current loadOnInit to false and new to true', () => {
      configStore.savedConfigs = [
        // @ts-ignore
        { name: 'test', loadOnInit: false },
        // @ts-ignore
        { name: 'test2', loadOnInit: true }
      ];

      configStore.updateLoadOnInit('test', true);

      expect(window.api.saveConfigs).toHaveBeenCalledWith([
        { name: 'test', loadOnInit: true },
        { name: 'test2', loadOnInit: false }
      ]);
    });

    it('should set loadOnInit to false', () => {
      // @ts-ignore
      configStore.savedConfigs = [{ name: 'test', loadOnInit: true }];

      configStore.updateLoadOnInit('test', false);

      expect(window.api.saveConfigs).toHaveBeenCalledWith([{ name: 'test', loadOnInit: false }]);
    });
  });

  describe('removeConfig', () => {
    it('should remove config from savedConfigs', () => {
      // @ts-ignore
      configStore.savedConfigs = [{ name: 'test' }];

      configStore.removeConfig('test');

      expect(configStore.savedConfigs).toEqual([]);
    });
  });

  describe('loadConfig', () => {
    it('should set properties in store from config', () => {
      configStore.loadConfig({
        name: 'test',
        songs: [],
        // @ts-ignore
        inputOptions: {
          method: 'eye gaze'
        },
        // @ts-ignore
        visualiserOptions: {
          stroke: 5
        }
      });

      expect(configStore.loadedConfig).toBe('test');
      expect(configStore.inputOptions).toEqual({ method: 'eye gaze' });
      expect(configStore.visualiserOptions).toEqual({ stroke: 5 });
    });
  });
});
