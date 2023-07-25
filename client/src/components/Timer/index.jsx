import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import TimerIcon from '@mui/icons-material/Timer';
import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Popover, Select, TextField, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetClientsQuery } from '../../app/features/clients/clientApiSlice';
import { useGetEmployeeProjectsQuery } from '../../app/features/projects/projectApiSlice';
import { useGetTasksByProjectIdQuery } from '../../app/features/tasks/taskApiSlice';
import { SelectLatestProjects } from '../../app/features/timeRecords/timeRecordSelectors';
import { useCreateTimeRecordMutation, useGetAllTimeRecordsQuery } from '../../app/features/timeRecords/timeRecordsApiSlice';
import { setCreateTimeRecord } from '../../app/features/timeRecords/timeRecordsSlice';
import { pauseTimer, startTimer, stopTimer, updateTime } from '../../app/features/timer/timerSlice';

function Timer() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const isRunning = useSelector((state) => state.timer.isRunning);
  const time = useSelector((state) => state.timer.time);
  const projects = useSelector(SelectLatestProjects);
  const intervalRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    client: '',
    project: '',
    task: '',
    workPerformed: ''
  });

  const [createTimeRecord] = useCreateTimeRecordMutation();
  const { refetch: refetchTimeSheetData } = useGetAllTimeRecordsQuery();

  const { data: clients } = useGetClientsQuery()
  const { data: projectsData } = useGetEmployeeProjectsQuery()
  const { data: tasks } = useGetTasksByProjectIdQuery({
    id: formValues.project,
  })

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
    // setFormValues({
    //   description: '', // Set initial form values here
    // });
  };

  const handleFormChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };


  const handleStartTimer = () => {
    dispatch(startTimer());
  };

  const handlePauseTimer = () => {
    dispatch(pauseTimer());
  };

  const handleStopTimer = async () => {
    try {
      const timeRecordData = await createTimeRecord({ timeSpent: time, date: dayjs().format() }).unwrap();
      dispatch(setCreateTimeRecord({ timeRecord: timeRecordData.timeRecord }));
      refetchTimeSheetData();
      dispatch(stopTimer());
      dispatch(updateTime(0));
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        dispatch(updateTime(time + 1));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, dispatch, time]);

  const handleTimerIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box className="bg-gray-100 rounded-md p-2">
      <Grid container alignItems="center" spacing={1}>
        {!isRunning && (
          <Grid item className="md:flex md:flex-row md:space-x-2">
            <IconButton onClick={handleStartTimer}>
              <PlayArrowIcon />
            </IconButton>
            {time !== 0 && (
              <IconButton onClick={handleStopTimer}>
                <StopIcon />
              </IconButton>
            )}
          </Grid>
        )}
        <Grid item>
          <Typography variant="h5" className="text-gray-700">
            {formatTime(time)}
          </Typography>
        </Grid>
        <Grid item className="md:flex md:flex-row md:space-x-2">
          {isRunning && (
            <>
              <IconButton onClick={handlePauseTimer}>
                <PauseIcon />
              </IconButton>
              <IconButton onClick={handleStopTimer}>
                <StopIcon />
              </IconButton>
            </>
          )}
          <IconButton onClick={handleTimerIconClick}>
            <TimerIcon className="text-purple-500" />
          </IconButton>
        </Grid>
      </Grid>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {/* Add your content for the Popover here */}
        <div className='md:min-w-full md:min-h-full'>
          <div className='flex items-center justify-between p-2 bg-[#1db4ab] text-gray-100'>
            <div className='flex items-center gap-1 text-2xl'>
              <TimerIcon className="text-gray-300" />
              <span>{formatTime(time)}</span>
            </div>
            <div>
              <StopIcon />
              <PlayArrowIcon />
            </div>
          </div>
        </div>
        
        {editMode ? (
          <div className='p-2 w-[400px]'>
            <div className='mb-2'>
              <FormControl fullWidth>
                <InputLabel>Select Client</InputLabel>
                <Select
                  value={formValues.client}
                  label="Select Client"
                  name='client'
                  onChange={handleFormChange}
                >
                  {
                    clients?.map((client) => (
                      <MenuItem value={client._id} key={client._id}>{client.name.first} {client.name.last}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </div>
            <div className='mb-2'>
              <FormControl fullWidth>
                <InputLabel>Select Project</InputLabel>
                <Select
                  value={formValues.project}
                  label="Select Project"
                  name='project'
                  onChange={handleFormChange}
                >
                  {
                    projectsData?.map((project) => (
                      <MenuItem value={project._id} key={project._id}>{project.title} </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </div>
            <div className='mb-2'>
              <FormControl fullWidth>
                <InputLabel>Select Task</InputLabel>
                <Select
                  value={formValues.task}
                  label="Select Task"
                  name='task'
                  onChange={handleFormChange}
                >
                  {
                    tasks?.map((task) => (
                      <MenuItem value={task._id} key={task._id}>{task.title} </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </div>
            <div className='mb-2'>
              <TextField value={formValues.workPerformed} onChange={handleFormChange} label='Work Performed' name="workPerformed" fullWidth />
            </div>
            <div className='flex justify-end'>
              <Button onClick={handleEditClick} autoFocus color='error'>
                Cancel
              </Button>
              <Button autoFocus>
                Save
              </Button>
            </div>
          </div>
        ) :
          (
            <div>
              <div className='flex justify-between items-center p-2 bg-gray-100'>
                <Typography variant='body2'>Describe what you are working on</Typography>
                <IconButton onClick={handleEditClick}>
                  <EditIcon />
                </IconButton>
              </div>
              <Typography variant='subtitle2' className='text-center p-2'>Your recent projects and tasks</Typography>
              <div className='h-[450px] m-2'>
                {projects?.length > 0 ? projects.map((project) => (
                  <div className="flex justify-between items-center w-full bg-gray-100 py-2 px-3 rounded-lg my-2" key={project._id}>
                    <div className="flex items-center mr-3">
                      <span className="w-4 h-4 p-1 rounded bg-[#f8bbd0]" />
                      <div className="ml-2 text-md font-semibold">{project.title}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 text-xs text-gray-600">Last active: </div>
                      <div className="text-xs text-gray-600 font-bold">{project.lastActiveDate}</div>
                    </div>
                    <div className="flex ml-auto">
                      <Tooltip title="View full log for this project">
                        <IconButton onClick={() => navigate('/timesheet')}>
                          <AccessTimeIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Proceed working">
                        <IconButton>
                          <PlayArrowIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                )) : (
                  <Typography>You didn’t work on
                    anything recently</Typography>
                )}
              </div>
            </div>
          )}
      </Popover>
    </Box>
  );
}

export default Timer;
