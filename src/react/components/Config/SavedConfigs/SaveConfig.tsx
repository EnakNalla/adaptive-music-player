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

function SaveConfig() {
  const { configStore } = useStore();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [loadOnInit, setLoadOnInit] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setName('');
    setNameError('');
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

      configStore.saveConfig(name, loadOnInit);
      handleClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Box textAlign="center" marginTop="1rem">
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Save current
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save config</DialogTitle>

        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            error={!!nameError}
            helperText={nameError}
            label="Name"
            name="config-name-input"
            id="config-name-input"
            value={name}
            onChange={e => {
              setNameError('');
              setName(e.target.value);
            }}
            fullWidth
            margin="normal"
            required
          />

          <FormControlLabel
            checked={loadOnInit}
            control={<Checkbox />}
            label="Load on startup"
            onChange={e => setLoadOnInit((e.target as HTMLInputElement).checked)}
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

export default SaveConfig;
