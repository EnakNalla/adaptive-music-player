import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { writeFileSync } from 'fs';
import { join, normalize } from 'path';
import { storeIpc } from './store';

let window: BrowserWindow;

storeIpc();

const createWindow = () => {
  window = new BrowserWindow({
    show: false,
    webPreferences: {
      webSecurity: false,
      preload: join(__dirname, 'preload.js')
    }
  });

  if (process.env.IS_DEV) {
    window.loadURL('http://localhost:3000');
  } else {
    window.removeMenu();
    window.loadFile(join(__dirname, 'index.html'));
  }

  window.webContents.once('did-finish-load', () => window.maximize());
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (!window) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('selectSongs', () => {
  return dialog.showOpenDialog(window, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      {
        name: 'mp3,ogg,wav',
        extensions: ['mp3', 'ogg', 'wav']
      }
    ]
  });
});

ipcMain.on('setFullscreen', (e, bool: boolean) => window.setFullScreen(bool));

ipcMain.handle('saveMissHits', async (e, playlistName: string, content: string) => {
  const date = new Date().toLocaleDateString().replace(/\//g, '.');
  const fileName = `${playlistName}-${date}.txt`;

  const savePath = await dialog.showSaveDialog(window, {
    defaultPath: normalize(process.env.HOME + `/Documents/${fileName}`)
  });

  if (savePath.canceled) return { msg: 'Failed to save miss hits.', type: 'error' };

  writeFileSync(savePath.filePath!, content);
  return { msg: 'Saved miss hits', type: 'success' };
});
