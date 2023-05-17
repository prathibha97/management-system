import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import TimerIcon from '@mui/icons-material/Timer';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pauseTimer, startTimer, stopTimer, updateTime } from '../../app/features/timer/timerSlice';

function Timer() {
  const isRunning = useSelector((state) => state.timer.isRunning);
  const time = useSelector((state) => state.timer.time);
  const dispatch = useDispatch();
  const intervalRef = useRef(null);

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

  const handleStartTimer = () => {
    dispatch(startTimer());
  };

  const handlePauseTimer = () => {
    dispatch(pauseTimer());
  };

  const handleStopTimer = () => {
    dispatch(stopTimer());
    dispatch(updateTime(0));
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

  return (
    <Box sx={{ backgroundColor: '#f9fbfc', borderRadius: 1, p: 1 }}>
      <Grid container alignItems="center" spacing={1}>
        {!isRunning && (
          <Grid item>
            <IconButton onClick={handleStartTimer}>
              <PlayArrowIcon />
            </IconButton>
          </Grid>
        )}
        <Grid item>
          <Typography variant="h5" sx={{ color: '#76797b' }}>
            {formatTime(time)}
          </Typography>
        </Grid>
        <Grid item>
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
          <IconButton onClick={handlePauseTimer}>
            <TimerIcon color="secondary" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Timer;