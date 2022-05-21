import '@testing-library/jest-dom';
import { songStub } from './stubs/songStub';
import { timerStub } from './stubs/timerStub';

window.api = {
  selectSongs: jest.fn().mockResolvedValue([songStub()]),
  getTimers: jest.fn().mockResolvedValue([timerStub()]),
  saveTimers: jest.fn(),
  getConfigs: jest.fn(),
  saveConfigs: jest.fn(),
  setFullscreen: jest.fn()
};
