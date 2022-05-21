import { ipcMain } from 'electron';
import Store, { Schema } from 'electron-store';

const schema: Schema<ElectronStore> = {
  timers: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        playtime: { type: 'number' },
        isDefault: { type: 'boolean' }
      }
    },
    default: [
      { name: '30 seconds', playtime: 30000, isDefault: true },
      { name: 'Indefinite', playtime: 0, isDefault: false }
    ]
  },
  configs: { type: 'array' }
};

const store = new Store({ schema });

export const storeIpc = () => {
  ipcMain.handle('getTimers', () => store.get('timers'));
  ipcMain.on('saveTimers', (e, timers: Timer[]) => store.set('timers', timers));

  ipcMain.handle('getConfigs', () => store.get('configs'));
  ipcMain.on('saveConfigs', (e, configs: SavedConfig[]) => store.set('configs', configs));
};
