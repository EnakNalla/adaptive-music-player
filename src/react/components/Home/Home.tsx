import { Button, ButtonGroup, Grid } from '@mui/material';
import { useStore } from '@stores';
import { useState } from 'react';
import Config from '../Config/Config';
import MissHits from './MissHits/MissHits';
import Playlist from './Playlist/Playlist';

function Home() {
  const { playerStore } = useStore();
  const [showConfig, setShowConfig] = useState(false);

  if (showConfig) return <Config setShowConfig={setShowConfig} />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Playlist />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ButtonGroup fullWidth>
          <Button variant="contained" size="large" onClick={playerStore.toggleEnabled}>
            Start
          </Button>
          <Button onClick={() => setShowConfig(true)}>Configuration</Button>
        </ButtonGroup>

        <MissHits />
      </Grid>
    </Grid>
  );
}

export default Home;
