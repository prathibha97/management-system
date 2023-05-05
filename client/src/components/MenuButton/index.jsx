import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDeleteTaskMutation } from '../../app/features/tasks/taskApiSlice';
import { setDeleteTask } from '../../app/features/tasks/taskSlice';

export default function MenuButton({ id, refetchProjectBoards, setNumTasks }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [deleteTask] = useDeleteTaskMutation()

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Edit Task</MenuItem>
        <MenuItem onClick={() => {
          deleteTask({ taskId: id })
            .unwrap()
            .then(() => {
              dispatch(setDeleteTask({ taskId: id }));
              setNumTasks((prev) => prev - 1);
              refetchProjectBoards();
              handleClose();
            })
        }}>Delete Task</MenuItem>
      </Menu>
    </div>
  );
}
