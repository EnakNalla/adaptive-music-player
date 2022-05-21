import { songStub } from '@test-utils/stubs/songStub';
import { timerStub } from '@test-utils/stubs/timerStub';
import { toast } from 'react-toastify';
import RootStore from '../rootStore';
import PlayerStore from './playerStore';

const playerStub = (paused: boolean) => ({
  paused,
  play: jest.fn(),
  pause: jest.fn()
});

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
jest.spyOn(global, 'clearTimeout');

describe('PlayerStore', () => {
  let rootStore: RootStore;
  let playerStore: PlayerStore;

  beforeEach(() => {
    rootStore = new RootStore();
    playerStore = rootStore.playerStore;
  });

  describe('setSong', () => {
    it('should set song from value', () => {
      playerStore.setSong(songStub());

      expect(playerStore.song).toEqual(songStub());
    });
  });

  describe('setPlayer', () => {
    it('should set player from value', () => {
      const player = {
        paused: true
      };
      //@ts-ignore
      playerStore.setPlayer(player);

      expect(playerStore.player).toEqual(player);
    });
  });

  describe('setTimer', () => {
    it('should set timer from value', () => {
      const timer = timerStub();
      rootStore.configStore.timers = [timer];

      playerStore.setTimer(timer.name);

      expect(playerStore.timer).toEqual(timer);
    });
  });

  describe('toggleEnabled', () => {
    it('should set enabled to true', () => {
      playerStore.toggleEnabled();

      expect(playerStore.enabled).toBeTruthy();
    });
  });

  describe('toggleShuffle', () => {
    it('should set shuffle to true', () => {
      playerStore.toggleShuffle();

      expect(playerStore.shuffle).toBeTruthy();
    });
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

  describe('removeSong', () => {
    it('should remove song from songs', () => {
      const song = songStub();
      playerStore.songs = [song];

      playerStore.removeSong(song.title);

      expect(playerStore.songs).toEqual([]);
    });
  });

  describe('onKeyup', () => {
    it('should call player.pause when code is Escape', () => {
      const player = playerStub(false);
      // @ts-ignore
      playerStore.player = player;

      // @ts-ignore
      playerStore.onKeyup({ code: 'Escape' });

      expect(player.pause).toHaveBeenCalled();
    });

    it('should call handleSwitchInput when input method is switch', () => {
      rootStore.configStore.inputOptions.method = 'switch';
      const spy = jest.fn();
      playerStore.handleSwitchInput = spy;

      // @ts-ignore
      playerStore.onKeyup({ code: 'e' });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('handleSwitchInput', () => {
    it('should call player.play when player.paused', () => {
      const player = playerStub(true);
      // @ts-ignore
      playerStore.player = player;

      playerStore.handleSwitchInput();

      expect(player.play).toHaveBeenCalled();
    });

    it('should call player.pause when !player.paused & timer is 0', () => {
      const player = playerStub(false);
      // @ts-ignore
      playerStore.player = player;
      playerStore.timer.playtime = 0;

      playerStore.handleSwitchInput();

      expect(player.pause).toHaveBeenCalled();
    });

    it('should add 1 to missHitCount if !player.paused & timer is not 0', () => {
      const player = playerStub(false);
      // @ts-ignore
      playerStore.player = player;

      playerStore.handleSwitchInput();

      expect(playerStore.missHitCount).toBe(1);
    });
  });

  describe('onPlay', () => {
    it('should setTimeout', () => {
      const player = playerStub(false);
      // @ts-ignore
      playerStore.player = player;

      playerStore.onPlay();

      expect(setTimeout).toHaveBeenCalled();

      jest.runAllTimers();

      expect(player.pause).toHaveBeenCalled();
    });

    it('should not setTimeout if timer is 0', () => {
      playerStore.timer.playtime = 0;

      playerStore.onPlay();

      expect(setTimeout).not.toHaveBeenCalled();
    });
  });

  describe('onPause', () => {
    it('should clearTimeout', () => {
      playerStore.onPause();

      expect(clearTimeout).toHaveBeenCalled();
    });

    it('should create missHit if input method is switch & timer is not 0', () => {
      const song = songStub();
      rootStore.configStore.inputOptions.method = 'switch';
      playerStore.song = song;

      playerStore.onPause();

      expect(playerStore.missHits[song.title]).toEqual(['0 miss hits']);
    });

    it('should add missHit if input method is switch & timer is not 0', () => {
      const song = songStub();
      rootStore.configStore.inputOptions.method = 'switch';
      playerStore.song = song;
      playerStore.missHits[song.title] = ['2 miss hits'];
      playerStore.missHitCount = 1;

      playerStore.onPause();

      expect(playerStore.missHits[song.title]).toEqual(['2 miss hits', '1 miss hit']);
    });
  });

  describe('onEnded', () => {
    const baseSong = songStub();
    beforeEach(() => {
      for (let i = 0; i <= 5; i++) {
        const song = songStub();
        song.title = `${song.title} ${i}`;
        playerStore.songs.push(song);
      }
      playerStore.song = playerStore.songs[0];
    });

    it('should find the next song', () => {
      playerStore.onEnded();

      expect(playerStore.song).toEqual({ title: `${baseSong.title} 1`, path: baseSong.path });
    });

    it('should get random song that is not the current song when shuffle is true', () => {
      playerStore.shuffle = true;

      playerStore.onEnded();

      expect(playerStore.song).not.toEqual({ title: `${baseSong.title} 0`, path: baseSong.path });
    });

    it('should get song[index + 1] when shuffle is true and current song is the same as next', () => {
      playerStore.shuffle = true;
      jest.spyOn(Math, 'random').mockReturnValue(0);

      playerStore.onEnded();

      expect(playerStore.song).toEqual({ title: `${baseSong.title} 1`, path: baseSong.path });
    });

    it('should default to song[0] when index is out of range', () => {
      playerStore.song = playerStore.songs[5];

      playerStore.onEnded();

      expect(playerStore.song).toEqual({ title: `${baseSong.title} 0`, path: baseSong.path });
    });
  });

  describe('onTimeUpdate', () => {
    it('should set currentTime to "00:10"', () => {
      const player = {
        duration: '100',
        currentTime: '10'
      };

      // @ts-ignore
      playerStore.player = player;

      playerStore.onTimeUpdate();

      expect(playerStore.currentTime).toBe('00:10');
    });
  });

  describe('onDurationChange', () => {
    it('should set duration to "01:40"', () => {
      const player = {
        duration: '100',
        currentTime: '10'
      };

      // @ts-ignore
      playerStore.player = player;

      playerStore.onDurationChange();

      expect(playerStore.duration).toBe('01:40');
    });
  });
});
