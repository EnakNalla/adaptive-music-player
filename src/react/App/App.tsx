import Input from '@components/Input/Input';
import Player from '@components/Player';
import Visualiser from '@components/Visualiser/Visualiser';
import { useStore } from '@stores';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
  const store = useStore();

  useEffect(() => {
    store.initData();
  }, []);

  return (
    <>
      <Input />
      <Player />
      <Visualiser />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default observer(App);
