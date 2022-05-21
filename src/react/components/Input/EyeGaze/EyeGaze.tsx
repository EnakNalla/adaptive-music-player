import Box from '@mui/material/Box';
import { useStore } from '@stores';
import { observer } from 'mobx-react-lite';
import { useCallback, useRef } from 'react';

function EyeGaze() {
  const { playerStore } = useStore();
  const innerCircle = useRef<HTMLDivElement>(null);
  let timeout: NodeJS.Timeout;

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
        className="circle"
        aria-label="eye gaze input"
        onMouseEnter={() => {
          innerCircle.current!.classList.add('animate');
          timeout = setTimeout(
            () => playerStore.player?.play(),
            playerStore.inputOptions.dwellTime * 1000
          );
        }}
        onMouseLeave={() => {
          clearTimeout(timeout);
          innerCircle.current!.classList.remove('animate');
        }}
        width={`${playerStore.inputSize.size}px`}
        height={`${playerStore.inputSize.size}px`}
      >
        <img
          src="/eye.png"
          className="input-img"
          alt="eye"
          width={playerStore.inputSize.imgSize}
          height={playerStore.inputSize.imgSize}
        />
        <Box
          className="inner-circle"
          ref={innerCircle}
          width={`${playerStore.inputSize.size}px`}
          height={`${playerStore.inputSize.size}px`}
        />
      </Box>
    </Box>
  );
}

export default observer(EyeGaze);
