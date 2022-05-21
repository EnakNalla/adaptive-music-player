import { useStore } from '@stores';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import ClickInput from './ClickInput/ClickInput';
import EyeGaze from './EyeGaze/EyeGaze';

function Input() {
  const { playerStore } = useStore();

  useEffect(() => {
    document.addEventListener('keyup', playerStore.onKeyup);

    return () => document.removeEventListener('keyup', playerStore.onKeyup);
  }, []);

  if (playerStore.visualiserActive) return null;

  switch (playerStore.inputOptions.method) {
    case 'mouse':
      return <ClickInput />;
    case 'eye gaze':
      return <EyeGaze />;
    case 'touch':
      return <ClickInput touch />;
    default:
      return null;
  }
}

export default observer(Input);
