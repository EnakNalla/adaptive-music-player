import Box from '@mui/material/Box';
import { useStore } from '@stores';
import { observer } from 'mobx-react-lite';

function Switch() {
  const { playerStore } = useStore();

  return (
    <Box className="input-fixed">
      <Box
        className="circle"
        width={`${playerStore.inputSize.size}px`}
        height={`${playerStore.inputSize.size}px`}
      >
        <img
          src="/switch.png"
          className="input-img"
          alt="Jellybean switch"
          width={playerStore.inputSize.imgSize}
          height={playerStore.inputSize.imgSize}
        />
      </Box>
    </Box>
  );
}

export default observer(Switch);
