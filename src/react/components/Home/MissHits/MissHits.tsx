import { Box, Button, ButtonGroup, List, ListItem, Typography } from '@mui/material';
import { useStore } from '@stores';
import { observer } from 'mobx-react-lite';
import { ReactNode, useRef } from 'react';

const MissHits = () => {
  const { playerStore } = useStore();

  const missHitsContent = useRef<HTMLDivElement>(null);

  if (playerStore.inputOptions.method !== 'switch') return null;

  const missHits: ReactNode[] = [];
  Object.keys(playerStore.missHits).forEach((key, index) => {
    const list = playerStore.missHits[key];

    const listItems = list.map((item, index) => <ListItem key={index}>{item}</ListItem>);

    missHits.push(
      <div key={index} className="mb-2">
        <Typography variant="h6">{key}</Typography>
        <List>{listItems}</List>
      </div>
    );
  });

  return (
    <div>
      <Box display="flex" justifyContent="space-between" marginTop="1rem">
        <Typography variant="h5">Miss hits</Typography>
        <ButtonGroup>
          <Button onClick={() => playerStore.saveMissHits(missHitsContent.current!.innerText)}>
            Save
          </Button>
          <Button onClick={playerStore.resetMissHits}>Reset</Button>
        </ButtonGroup>
      </Box>
      <Box
        sx={{
          maxHeight: '80vh',
          overflowY: 'auto',
          marginTop: '1rem'
        }}
        ref={missHitsContent}
      >
        {missHits}
      </Box>
    </div>
  );
};

export default observer(MissHits);
