import Wave from '@foobar404/wave';
import { useStore } from '@stores';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';

const Visualiser = () => {
  const { configStore, playerStore } = useStore();
  const canvasElm = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!playerStore.visualiserActive || !canvasElm.current) return;

    canvasElm.current.style.backgroundColor = configStore.visualiserOptions.colours.background;
    canvasElm.current.width = canvasElm.current.offsetWidth;
    canvasElm.current.height = canvasElm.current.offsetHeight;

    const wave = new Wave();

    wave.fromElement('audio', 'canvas', {
      type: configStore.visualiserOptions.type,
      stroke: configStore.visualiserOptions.stroke,
      colors: [
        configStore.visualiserOptions.colours.primary,
        configStore.visualiserOptions.colours.secondary,
        configStore.visualiserOptions.colours.tertiary,
        configStore.visualiserOptions.colours.quaternary
      ]
    });
  });

  if (!playerStore.visualiserActive) return null;

  return <canvas id="canvas" ref={canvasElm} />;
};

export default observer(Visualiser);
