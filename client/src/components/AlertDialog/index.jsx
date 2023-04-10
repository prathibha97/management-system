import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { removeEmployee } from '../../redux/actions/employeeActions';

export default function AlertDialog({ open, handleClose, empNo, setAlert, title}) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    try {
      dispatch(removeEmployee(empNo))
      handleClose()
      setAlert({ open: true, message: 'Employee removed successfully', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' });
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