import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-toastify';

export default class PlayerStore {
  songs: Song[] = [];
  song?: Song;

  constructor() {
    makeAutoObservable(this);
  }

  setSong = (song: Song) => (this.song = song);

  selectSongs = async (newList: boolean) => {
    try {
      const songs = await window.api.selectSongs();

      runInAction(() => {
        if (newList) {
          this.songs = songs;
          this.song = songs[0];
        } else this.songs = this.songs.concat(songs);
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  };
}
