import Confirm from '@components/Confirm';
import {
  Box,
  Button,
  ButtonGroup,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import { useStore } from '@stores';
import { observer } from 'mobx-react-lite';

function Playlist() {
  const { playerStore } = useStore();

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <ButtonGroup>
          <Button onClick={() => playerStore.selectSongs(true)}>New playlist</Button>
          <Button onClick={() => playerStore.selectSongs(false)}>Add songs</Button>
        </ButtonGroup>

        <FormControlLabel
          checked={playerStore.shuffle}
          onChange={playerStore.toggleShuffle}
          control={<Switch defaultChecked />}
          label="Shuffle"
        />
      </Box>

      <TableContainer
        sx={{
          maxHeight: '70vh',
          overflowY: 'auto'
        }}
      >
        <Table>
          <TableBody>
            {playerStore.songs.map((s, i) => (
              <TableRow
                key={i}
                onClick={() => playerStore.setSong(s)}
                hover
                selected={s.title === playerStore.song?.title}
              >
                <TableCell>{s.title}</TableCell>
                <TableCell>
                  <Confirm onConfirm={() => playerStore.removeSong(s.title)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default observer(Playlist);
