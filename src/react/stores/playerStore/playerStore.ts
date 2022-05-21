import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import RootStore from '../rootStore';

export default class PlayerStore {
  songs: Song[] = [];
  song?: Song;
  shuffle = false;

  enabled = false;
  player?: HTMLAudioElement;
  currentTime = '00:00';
  duration = '00:00';
  private timeout?: NodeJS.Timeout;
  timer: Timer = { name: '30 seconds', playtime: 300000, isDefault: true };
  visualiserActive = false;

  missHitCount = 0;
  missHits: MissHits = {};

  constructor(private root: RootStore) {
    makeAutoObservable(this);
  }

  get inputOptions() {
    return this.root.configStore.inputOptions;
  }

  get timers() {
    return this.root.configStore.timers;
  }

  setSong = (song: Song) => (this.song = song);

  setPlayer = (player: HTMLAudioElement) => (this.player = player);

  setTimer = (name: string) => (this.timer = this.timers.find(t => t.name === name)!);

  toggleEnabled = () => (this.enabled = !this.enabled);

  toggleShuffle = () => (this.shuffle = !this.shuffle);

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

  removeSong = (title: string) => {
    const index = this.songs.findIndex(s => s.title === title);
    this.songs.splice(index, 1);
  };

  onKeyup = (event: KeyboardEvent) => {
    if (event.code === 'Escape') {
      this.player?.pause();
      return;
    }

    if (this.inputOptions.method === 'switch') this.handleSwitchInput();
  };

  handleSwitchInput = () => {
    if (this.player?.paused) {
      this.player.play();
      return;
    }

    if (this.timer.playtime === 0) this.player?.pause();
    else this.missHitCount++;
  };

  onPlay = () => {
    this.visualiserActive = true;
    window.api.setFullscreen(true);

    if (this.timer.playtime === 0) return;

    this.timeout = setTimeout(() => this.player?.pause(), this.timer.playtime);
  };

  onPause = () => {
    clearTimeout(this.timeout);
    this.visualiserActive = false;
    window.api.setFullscreen(false);

    if (this.inputOptions.method !== 'switch' || this.timer.playtime === 0) return;

    const missHitText = this.missHitCount === 1 ? '1 miss hit' : `${this.missHitCount} miss hits`;
    const missHit = this.missHits[this.song!.title];
    if (missHit) missHit.push(missHitText);
    else this.missHits[this.song!.title] = [missHitText];

    this.missHitCount = 0;
  };

  onEnded = () => {
    clearTimeout(this.timeout);

    const index = this.shuffle
      ? Math.floor(Math.random() * (this.songs.length + 1))
      : this.songs.findIndex(s => s.title === this.song!.title)! + 1;

    let nextSong = this.songs[index];
    if (nextSong && nextSong.title === this.song!.title) {
      nextSong = this.songs[index + 1];
    }

    this.song = nextSong ?? this.songs[0];
  };

  onTimeUpdate = () => {
    this.currentTime = this.parseAudioTime(this.player!.currentTime);
  };

  onDurationChange = () => {
    this.duration = this.parseAudioTime(this.player!.duration);
  };

  private parseAudioTime = (playtime: number) => {
    let m = (playtime / 60) % 60;
    let s = playtime % 60;
    m = parseInt(m.toString());
    s = parseInt(s.toString());

    return `${this.padWith0(m)}:${this.padWith0(s)}`;
  };

  private padWith0 = (playtime: number) => (playtime < 10 ? '0' + playtime : playtime);
}
