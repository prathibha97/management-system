import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';

function LeaveRejectDialog({ open, onClose, onReject }) {
  const [reason, setReason] = useState('');

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleReject = () => {
    onReject(reason);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reject Leave Request</DialogTitle>
      <DialogContent sx={{ width: '500px'}}>
        <TextField
          label="Reason for Rejection"
          fullWidth
          multiline
          rows={4}
          value={reason}
          onChange={handleReasonChange}
          sx={{ marginTop: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleReject} color="error">
          Reject
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LeaveRejectDialog;