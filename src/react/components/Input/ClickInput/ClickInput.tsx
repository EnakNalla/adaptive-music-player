import Box from '@mui/material/Box';
import { useStore } from '@stores';
import { useCallback } from 'react';

interface Props {
  touch?: boolean;
}

function ClickInput({ touch }: Props) {
  const { playerStore } = useStore();

  const inputContainer = useCallback((node: HTMLDivElement) => {
    if (playerStore.inputOptions.fixedPosition || !node) return;

    const { top, left } = playerStore.getRandomPosition();
    node.style.top = top;
    node.style.left = left;
  }, []);

  return (
    <Box
      ref={inputContainer}
      className={playerStore.inputOptions.fixedPosition ? 'input-fixed' : 'input-random'}
    >
      <Box
        className="circle clickable"
        onClick={() => playerStore.player?.play()}
        width={`${playerStore.inputSize.size}px`}
        height={`${playerStore.inputSize.size}px`}
        aria-label={touch ? 'touch input' : 'mouse input'}
      >
        <img
          src={touch ? '/touch.png' : '/mouse.png'}
          className="input-img"
          alt={touch ? 'touch symbol' : 'computer mouse symbol'}
          width={playerStore.inputSize.imgSize}
          height={playerStore.inputSize.imgSize}
        />
      </Box>
    </Box>
  );
}

export default ClickInput;
