import { contextBridge } from 'electron';

export const preloadApi = {};

contextBridge.exposeInMainWorld('api', preloadApi);
