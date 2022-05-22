import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField
} from '@mui/material';
import { useStore } from '@stores';
import { useState } from 'react';

function AddTimer() {
  const { configStore } = useStore();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [playtime, setPlaytime] = useState(0);
  const [playtimeError, setPlaytimeError] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setName('');
    setPlaytime(0);
    setNameError('');
    setPlaytimeError('');
    setError('');
    setOpen(false);
  };

  const handleSubmit = () => {
    try {
      setError('');
      if (!name) {
        setNameError('Name is required.');
        return;
      }
      if (playtime <= 0) {
        setPlaytimeError('Playtime must be greater than zero.');
        return;
      }

      configStore.addTimer({ name, playtime: playtime * 1000, isDefault });
      handleClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Box textAlign="center" marginTop="1rem">
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Create timer
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create timer</DialogTitle>

        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            error={!!nameError}
            helperText={nameError}
            label="Name"
            name="name-input"
            id="name-input"
            value={name}
            onChange={e => {
              setNameError('');
              setName(e.target.value);
            }}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            error={!!playtimeError}
            helperText={playtimeError}
            label="Time (in seconds)"
            name="time-input"
            id="time-input"
            value={playtime}
            onChange={e => {
              setPlaytimeError('');
              setPlaytime(e.target.value as unknown as number);
            }}
            fullWidth
            type="number"
            required
          />
          <FormControlLabel
            checked={isDefault}
            control={<Checkbox />}
            label="Default"
            onChange={e => setIsDefault((e.target as HTMLInputElement).checked)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTimer;
