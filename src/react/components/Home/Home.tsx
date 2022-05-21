import { Grid } from '@mui/material';
import Playlist from './Playlist';

function Home() {
  return (
    <Grid container gap={2}>
      <Grid item xs={12} sm={5}>
        <Playlist />
      </Grid>
    </Grid>
  );
}

export default Home;
