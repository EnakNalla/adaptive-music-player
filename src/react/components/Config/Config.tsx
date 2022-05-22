import { Box, Button, Grid, Typography } from '@mui/material';
import InputConfig from './InputConfig/InputConfig';

interface Props {
  setShowConfig(show: boolean): void;
}

function Config({ setShowConfig }: Props) {
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Typography variant="h4" component="h1" marginRight="1rem">
          Configuration
        </Typography>
        <Button variant="outlined" onClick={() => setShowConfig(false)}>
          Return home
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <InputConfig />
        </Grid>
      </Grid>
    </>
  );
}

export default Config;
