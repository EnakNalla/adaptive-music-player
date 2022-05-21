import { Button, Grid } from '@mui/material';
import { useStore } from '@stores';
import MissHits from './MissHits/MissHits';
import Playlist from './Playlist/Playlist';

function Home() {
  const { playerStore } = useStore();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Playlist />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" size="large" fullWidth onClick={playerStore.toggleEnabled}>
          Start
        </Button>
        <MissHits />
      </Grid>
    </Grid>
  );
}

export default Home;
