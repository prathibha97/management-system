/* eslint-disable react/jsx-props-no-spreading */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { useState } from 'react';

function EditTimeRecord({ openEditDialog, handleCloseEditDialog, handleSubmit, params }) {
  const [client, setClient] = useState(params.row.client);
  const [project, setProject] = useState(params.row.project);
  const [task, setTask] = useState(params.row.task);
  const [workPerformed, setWorkPerformed] = useState(params.row.workPerformed);
  const [dateLogged, setDateLogged] = useState(dayjs(params.row.date).format());
  const [timeLogged, setTimeLogged] = useState(dayjs(params.row.timeSpent));

  return (
    <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ padding: 3 }}>Edit Time Record</DialogTitle>
      <DialogContent sx={{ padding: '20px 30px' }}>
        <div className="flex flex-col gap-5 bg-slate-100 p-4 rounded-md">
          <div className="flex items-center">
            <FormControl fullWidth>
              <InputLabel>Select Client</InputLabel>
              <Select
                value={client}
                label="Select Client"
                onChange={(e) => setClient(e.target.value)}
              >
                <MenuItem value='Casual'>Casual</MenuItem>
                <MenuItem value='Annual'>Annual</MenuItem>
                <MenuItem value='Medical'>Medical</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex items-center gap-2">
            <FormControl fullWidth>
              <InputLabel>Select Project</InputLabel>
              <Select
                value={project}
                label="Select Project"
                onChange={(e) => setProject(e.target.value)}
              >
                <MenuItem value='Casual'>Casual</MenuItem>
                <MenuItem value='Annual'>Annual</MenuItem>
                <MenuItem value='Medical'>Medical</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Select Task</InputLabel>
              <Select
                value={task}
                label="Select Task"
                onChange={(e) => setTask(e.target.value)}
              >
                <MenuItem value='Casual'>Casual</MenuItem>
                <MenuItem value='Annual'>Annual</MenuItem>
                <MenuItem value='Medical'>Medical</MenuItem>
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
                renderInput={(items) => <TextField {...items} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Time Logged"
                value={timeLogged}
                onChange={(time) => setTimeLogged(time)}
              />
            </LocalizationProvider>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEditDialog} autoFocus color='error'>
          Close
        </Button>
        <Button onClick={() => handleSubmit(client, project, task, workPerformed, dateLogged, timeLogged)} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTimeRecord;
