import { useStore } from '@stores';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import ClickInput from './ClickInput/ClickInput';
import EyeGaze from './EyeGaze/EyeGaze';
import Switch from './Switch/Switch';

function Input() {
  const { playerStore } = useStore();

  useEffect(() => {
    if (!playerStore.enabled) return;
    document.addEventListener('keyup', playerStore.onKeyup);

    return () => document.removeEventListener('keyup', playerStore.onKeyup);
  }, [playerStore.enabled]);

  if (playerStore.visualiserActive || !playerStore.enabled) return null;

  switch (playerStore.inputOptions.method) {
    case 'mouse':
      return <ClickInput />;

    case 'eye gaze':
      return <EyeGaze />;
    case 'touch':
      return <ClickInput touch />;
    case 'switch':
      return <Switch />;
    default:
      return null;
  }
}

export default observer(Input);
