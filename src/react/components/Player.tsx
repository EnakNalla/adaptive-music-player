import { useStore } from '@stores';
import { observer } from 'mobx-react-lite';

function Player() {
  const { playerStore } = useStore();

  return (
    <audio
      id="audio"
      src={playerStore.song?.path}
      ref={playerStore.setPlayer}
      onPlay={playerStore.onPlay}
      onPause={playerStore.onPause}
      onEnded={playerStore.onEnded}
      onDurationChange={playerStore.onDurationChange}
      onTimeUpdate={playerStore.onTimeUpdate}
    />
  );
}

export default observer(Player);
