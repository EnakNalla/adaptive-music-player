import { Card, CardActionArea, CardContent, Container, Grid, Typography } from '@mui/material';
import { useStore } from '@stores';

function InputPrompt() {
  const { configStore } = useStore();

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography component="h1" variant="h3" textAlign="center" marginBottom="2rem">
            Adaptive music player
          </Typography>
          <Typography textAlign="center" component="h2" variant="h5">
            Select an input method
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Card
            sx={{ maxWidth: 200, margin: '1rem' }}
            onClick={() => configStore.setInputOption('method', 'mouse')}
          >
            <CardActionArea aria-label="mouse input method select">
              <CardContent>
                <img
                  src="/mouse.png"
                  alt="computer mouse symbol"
                  width="100"
                  height="100"
                  className="input-img"
                />

                <Typography textAlign="center">Mouse</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card
            sx={{ maxWidth: 200, margin: '1rem' }}
            onClick={() => configStore.setInputOption('method', 'touch')}
          >
            <CardActionArea aria-label="touch input method select">
              <CardContent>
                <img
                  src="/touch.png"
                  alt="touch symbol"
                  width="100"
                  height="100"
                  className="input-img"
                />

                <Typography textAlign="center">Touch</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card
            sx={{ maxWidth: 200, margin: '1rem' }}
            onClick={() => configStore.setInputOption('method', 'eye gaze')}
          >
            <CardActionArea aria-label="eye gaze input method select">
              <CardContent>
                <img
                  src="/eye.png"
                  alt="eye symbol"
                  width="100"
                  height="100"
                  className="input-img"
                />

                <Typography textAlign="center">Eye gaze</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card
            sx={{ maxWidth: 200, margin: '1rem' }}
            onClick={() => configStore.setInputOption('method', 'switch')}
          >
            <CardActionArea aria-label="switch input method select">
              <CardContent>
                <img
                  src="/switch.png"
                  alt="jellybean switch"
                  width="100"
                  height="100"
                  className="input-img"
                />

                <Typography textAlign="center">Switch</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default InputPrompt;
