import Confirm from '@components/Confirm/Confirm';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useStore } from '@stores';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import AddTimer from './AddTimer';

const NON_DELETABLE_IDS = ['30 seconds', 'Indefinite'];

function InputConfig() {
  const { configStore, playerStore } = useStore();
  const [dwellTimeError, setDwellTimeError] = useState('');

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography>Input method: {configStore.inputOptions.method}</Typography>

        <Button onClick={() => configStore.setInputOption('method', undefined)} variant="contained">
          Change
        </Button>
      </Box>

      <FormControlLabel
        sx={{
          marginBottom: '1rem'
        }}
        control={
          <Switch
            checked={configStore.inputOptions.fixedPosition}
            onChange={e => configStore.setInputOption('fixedPosition', e.target.checked)}
          />
        }
        label="Fixed position"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="target-size-label">Target size</InputLabel>
        <Select
          labelId="target-size-label"
          id="target-select"
          value={configStore.inputOptions.size}
          label="Target size"
          onChange={e => configStore.setInputOption('size', e.target.value)}
        >
          <MenuItem value="small">Small</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="large">Large</MenuItem>
        </Select>
      </FormControl>

      <TextField
        margin="normal"
        label="Dwell time"
        type="number"
        name="dwell-time-input"
        id="dwell-time-input"
        fullWidth
        value={configStore.inputOptions.dwellTime}
        error={!!dwellTimeError}
        helperText={dwellTimeError}
        onChange={e => {
          setDwellTimeError('');
          const dwellTime = parseInt(e.target.value);
          if (dwellTime < 0) {
            setDwellTimeError('Dwell time cannot be negative');
            return;
          }
          configStore.setInputOption('dwellTime', dwellTime);
        }}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="current-timer-label">Current timer</InputLabel>
        <Select
          labelId="current-timer-label"
          id="timer-select"
          value={playerStore.timer.name}
          label="Current timer"
          onChange={e => playerStore.setTimer(e.target.value)}
        >
          {configStore.timers.map((t, i) => (
            <MenuItem key={i} value={t.name}>
              {t.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer>
        <Table aria-label="timers table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Default</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {configStore.timers.map((t, i) => (
              <TableRow key={i}>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.playtime / 1000} seconds</TableCell>
                <TableCell>
                  {t.isDefault ? (
                    'True'
                  ) : (
                    <Button
                      onClick={() => {
                        configStore.changeDefaultTimer(t.name);
                      }}
                    >
                      False
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  {NON_DELETABLE_IDS.includes(t.name) ? (
                    'Not allowed'
                  ) : (
                    <Confirm onConfirm={() => configStore.removeTimer(t)} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddTimer />
    </div>
  );
}

export default observer(InputConfig);
