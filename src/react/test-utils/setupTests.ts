import '@testing-library/jest-dom';
import { songStub } from './stubs/songStub';

window.api = {
  selectSongs: jest.fn().mockResolvedValue([songStub()])
};
