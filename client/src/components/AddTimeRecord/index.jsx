/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useGetClientsQuery } from '../../app/features/clients/clientApiSlice';
import { useGetEmployeeProjectsQuery } from '../../app/features/projects/projectApiSlice';
import { useGetTasksByProjectIdQuery } from '../../app/features/tasks/taskApiSlice';

function AddTimeRecord({ openDialog, handleCloseDialog, handleSubmit }) {

  const { data: projects } = useGetEmployeeProjectsQuery()
  const [project, setProject] = useState(projects[0]?._id)
  const [client, setClient] = useState('')
  const [task, setTask] = useState('')
  const [workPerformed, setWorkPerformed] = useState('')
  const [dateLogged, setDateLogged] = useState(dayjs().format())
  const [timeLogged, setTimeLogged] = useState('')

  const { data: clients } = useGetClientsQuery()
  const { data: tasks } = useGetTasksByProjectIdQuery({ id: project })

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ padding: 3 }}>Add Time Record</DialogTitle>
      <DialogContent sx={{ padding: '20px 30px' }}>
        <div className="flex flex-col gap-5 bg-slate-100 p-4 rounded-md">
          <div className="flex items-center">
            <FormControl fullWidth>
              <InputLabel>Select Project</InputLabel>
              <Select
                value={project}
                label="Select Project"
                onChange={(e) => setProject(e.target.value)}
              >
                {
                  projects?.map((project) => (
                    <MenuItem value={project._id} key={project._id}>{project.title}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className="flex items-center gap-2">
            <FormControl fullWidth>
              <InputLabel>Select Client</InputLabel>
              <Select
                value={client}
                label="Select Client"
                onChange={(e) => setClient(e.target.value)}
              >
                {
                  clients?.map((client) => (
                    <MenuItem value={client._id} key={client._id}>{client.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Select Task</InputLabel>
              <Select
                value={task}
                label="Select Task"
                onChange={(e) => setTask(e.target.value)}
              >
                {
                  tasks?.map((task) => (
                    <MenuItem value={task._id} key={task._id}>{task.title}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className="flex items-center">
            <TextField value={workPerformed} onChange={(e) => setWorkPerformed(e.target.value)} label='Work Performed' fullWidth />
          </div>
          <div className="flex items-center justify-between gap-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date Logged"
                inputFormat="MM/DD/YYYY"
                value={dayjs(dateLogged)} // Convert dateLogged to Dayjs object
                onChange={(date) => setDateLogged(date.format())} // Convert date to string before updating state
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              value={timeLogged}
              onChange={(e) => setTimeLogged(e.target.value)}
              label='Time Logged'
              placeholder='00:00'
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} autoFocus color='error'>
          Close
        </Button>
        <Button onClick={() =>
          handleSubmit(
            project,timeLogged, client,dateLogged, workPerformed, task
          )
        } autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTimeRecord