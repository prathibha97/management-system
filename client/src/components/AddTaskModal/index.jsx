import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createTask } from '../../redux/actions/taskActions';

function AddTaskModal({ open, handleClose, boardId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('backlog');
  const [assignee, setAssignee] = useState('')
  const taskNameRef = useRef();

  const dispatch = useDispatch();

  const projectId = useSelector((state) => state.projectDetailsById.project._id);
  // const { tasks } = useSelector((state) => state.getTasksByProject);


  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  // useEffect(() => {
  //   // Update the state of the component when the tasks state changes
  //   setTitle('');
  //   setDescription('');
  //   setStatus('backlog');
  //   setAssignee('');
  // }, [tasks]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleAssigneeChange = (event) => {
    setAssignee(event.target.value);
  };

  const handleAddButtonClick = () => {
    try {
      // Add the task and close the dialog
      dispatch(createTask(boardId, projectId, title, description, status, assignee));

      setAlert({ open: true, message: 'Attendance marked successfully', severity: 'success' });
      handleClose();
    } catch (err) {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' });
    }
  };

  const handleEnterKey = (event) => {
    // If the user presses Enter while typing in the task name input field,
    // focus on the description input field
    if (event.key === 'Enter' && taskNameRef.current) {
      taskNameRef.current.blur();
      event.preventDefault();
      event.stopPropagation();
      document.getElementById('description').focus();
    }
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent >
          <TextField
            id="task-name"
            label="Task Name"
            value={title}
            onChange={handleTitleChange}
            inputRef={taskNameRef}
            onKeyDown={handleEnterKey}
            required
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            id="description"
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
            multiline
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            id="assignee"
            label="Assign To"
            value={assignee}
            onChange={handleAssigneeChange}
            multiline
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <FormControl fullWidth >
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={handleStatusChange}>
              <MenuItem value="backlog">Backlog</MenuItem>
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="review">Review</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} style={{ backgroundColor: '#48716f', color: 'white' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddButtonClick}
            disabled={!title}
            style={{ backgroundColor: '#1EB3AB', color: 'white' }}
          >
            Create Task
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={alert?.open} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert?.severity}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddTaskModal;
