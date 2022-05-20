import { songStub } from '@test-utils/stubs/songStub';
import { toast } from 'react-toastify';
import PlayerStore from './playerStore';

describe('PlayerStore', () => {
  let playerStore: PlayerStore;

  beforeEach(() => {
    playerStore = new PlayerStore();
  });

  describe('selectSongs', () => {
    it('should set songs from api.selectSongs', async () => {
      await playerStore.selectSongs(true);

      expect(playerStore.songs).toEqual([songStub()]);
      expect(playerStore.song).toEqual(songStub());
    });

    it('should add to songs from api.selectSongs', async () => {
      playerStore.songs = [songStub(true)];
      await playerStore.selectSongs(false);

      expect(playerStore.songs).toEqual([songStub(true), songStub()]);
    });

    it('should toast error from api.selectSongs', async () => {
      jest.spyOn(toast, 'error');
      window.api.selectSongs = jest.fn().mockRejectedValueOnce(new Error('test error'));
      await playerStore.selectSongs(true);

      expect(toast.error).toHaveBeenCalledWith('test error');
    });
  });

  describe('setSong', () => {
    it('should set song from value', () => {
      playerStore.setSong(songStub());

      expect(playerStore.song).toEqual(songStub());
    });
  });
});
