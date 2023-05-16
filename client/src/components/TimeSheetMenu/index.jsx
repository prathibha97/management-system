import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';

import React from 'react';


function TimeSheetMenu({ anchorEl, handleMenuClose, handleView, handleEdit, handleDelete}) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem onClick={handleView}>
        <Visibility fontSize='small' />
        {' '}
        View
      </MenuItem>
      <MenuItem onClick={handleEdit}>
        <Edit fontSize='small' />
        {' '}
        Edit
      </MenuItem>
      <MenuItem onClick={handleDelete}>
        <Delete fontSize='small' />
        {' '}
        Delete
      </MenuItem>
    </Menu>
  )
}

export default TimeSheetMenu