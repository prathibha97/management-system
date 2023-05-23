import { Close, Delete, Edit, Visibility } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../app/features/auth/authSelectors';

function TimeSheetMenu({ anchorEl, handleMenuClose, handleView, handleEdit, handleDelete, handleReject }) {

  const user = useSelector(selectCurrentUser)

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('')

  const handleDeleteConfirmationOpen = () => {
    setDeleteConfirmationOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    handleDelete();
  };

  const handleRejectOpen = () => {
    setRejectOpen(true);
    handleMenuClose();
  }

  const handleRejectClose = () => {
    setRejectOpen(false);
  }

  const handleRejectConfirmation = () => {
    setRejectOpen(false);
    handleReject(rejectReason);
  }

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'start',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'start',
        }}
      >
        <MenuItem onClick={handleView} sx={{ '&:hover': { bgcolor: 'grey.200' } }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Visibility fontSize='small' />
            <Typography variant='body1' sx={{ ml: 1 }}>View</Typography>
          </div>
        </MenuItem>
        <MenuItem onClick={handleEdit} sx={{ '&:hover': { bgcolor: 'grey.200' } }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Edit fontSize='small' />
            <Typography variant='body1' sx={{ ml: 1 }}>Edit</Typography>
          </div>
        </MenuItem>
        {
          user?.isAdmin && (
            <MenuItem onClick={handleRejectOpen} sx={{ '&:hover': { bgcolor: 'grey.200' } }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Close fontSize='small' color='error' />
                <Typography variant='body1' color='red' sx={{ ml: 1 }}>Reject</Typography>
              </div>
            </MenuItem>
          )
        }
        <MenuItem onClick={handleDeleteConfirmationOpen} sx={{ '&:hover': { bgcolor: 'grey.200' } }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Delete fontSize='small' color='error' />
            <Typography variant='body1' color='red' sx={{ ml: 1 }}>Delete</Typography>
          </div>
        </MenuItem>
      </Menu>

      <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this time log?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} color="error" >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={rejectOpen} onClose={handleRejectClose}>
        <DialogTitle>Reject Time Record</DialogTitle>
        <DialogContent>
          <TextField placeholder='Rejection Justification' sx={{ width: 550 }} value={rejectReason} onChange={e => setRejectReason(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRejectClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRejectConfirmation} color="error" >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TimeSheetMenu;
