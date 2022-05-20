import PlayerStore from './playerStore/playerStore';

export default class RootStore {
  playerStore: PlayerStore;

  constructor() {
    this.playerStore = new PlayerStore();
  }
}
