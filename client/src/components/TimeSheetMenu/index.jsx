import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Menu, MenuItem, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import React, { useState } from 'react';

function TimeSheetMenu({ anchorEl, handleMenuClose, handleView, handleEdit, handleDelete }) {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

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
        <MenuItem onClick={handleDeleteConfirmationOpen} sx={{ '&:hover': { bgcolor: 'grey.200' } }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Delete fontSize='small' />
            <Typography variant='body1' sx={{ ml: 1 }}>Delete</Typography>
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
    </>
  )
}

export default TimeSheetMenu;
