import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

interface Props {
  btnTitle?: string;
  title?: string;
  content?: string;
  onConfirm(): void;
}

function Confirm({ btnTitle, title, content, onConfirm }: Props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} color="error" variant="outlined">
        {btnTitle ?? 'Delete'}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title ?? 'Are you sure?'}</DialogTitle>
        {content && <DialogContentText>{content}</DialogContentText>}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Confirm;
