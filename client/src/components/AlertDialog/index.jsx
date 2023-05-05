import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';

export default function AlertDialog({ open, handleClose, id, setAlert, title, remove, changeCount, errorRemoveEmployee, action}) {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      await remove( {id} ).unwrap()
      dispatch(action({ employeeId: id }))
      changeCount(1)
      handleClose()
      setAlert({ open: true, message: 'Removed successfully', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: errorRemoveEmployee?.data?.message, severity: 'error' });
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}