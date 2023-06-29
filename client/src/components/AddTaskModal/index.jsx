/* eslint-disable no-shadow */
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useCreateTaskMutation } from '../../app/features/tasks/taskApiSlice';
import { setCreateTask } from '../../app/features/tasks/taskSlice';
import Loader from '../Loader';
import { useGetProjectByIdQuery } from '../../app/features/projects/projectApiSlice';

function AddTaskModal({ open, handleClose, boardId, setNumTasks, refetchProjectBoards }) {
  const projectId = useSelector((state) => state.projects.project._id);
  const { data: project } = useGetProjectByIdQuery({ id: projectId });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('backlog');
  const [assignee, setAssignee] = useState('');

  const taskNameRef = useRef();

  const dispatch = useDispatch();

  const [createTask, { isLoading: isCreateTaskLoading, error: taskCreateError }] = useCreateTaskMutation();

  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

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

  if (isCreateTaskLoading) return <Loader />;

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
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
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Assign To</InputLabel>
            <Select
              value={assignee}
              onChange={handleAssigneeChange}
              // displayEmpty
            >
              {/* <MenuItem value="">Select Assignee</MenuItem> */}
              {project?.assignee.map((assignee) => (
                <MenuItem key={assignee._id} value={assignee._id}>
                  {assignee.name.first} {assignee.name.last}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
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
            onClick={async () => {
              try {
                const { task } = await createTask({ boardId, projectId, title, description, status, assignee }).unwrap();
                dispatch(setCreateTask({ task }));
                setNumTasks(1);
                refetchProjectBoards();
                setAlert({ open: true, message: 'Task added successfully', severity: 'success' });
                handleClose();
              } catch (error) {
                setAlert({ open: true, message: taskCreateError?.data?.message || error.message, severity: 'error' });
              }
            }}
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
