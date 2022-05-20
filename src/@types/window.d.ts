import { preloadApi } from '../electron/preload';

declare global {
  interface Window {
    api: typeof preloadApi;
  }
}
