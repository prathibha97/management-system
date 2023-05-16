import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from '@mui/icons-material/Stop';
import TimerIcon from "@mui/icons-material/Timer";
import { IconButton } from "@mui/material";
import { useRef, useState } from "react";

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const startTimer = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  return (
    <div className="flex items-center bg-[#f9fbfc] p-1 rounded-lg w-fit">
      {!isRunning ? (
        <div>
          <IconButton onClick={startTimer}>
            <PlayArrowIcon />
          </IconButton>
        </div>
      ) : null}
      <div className="text-[#76797b] text-xl">{formatTime(time)}</div>
      <div>
        {isRunning && (
          <>
            <IconButton onClick={pauseTimer}>
              <PauseIcon />
            </IconButton>
            <IconButton onClick={stopTimer}>
              <StopIcon />
            </IconButton>
          </>
        )
        }
      </div><IconButton onClick={pauseTimer}>
        <TimerIcon color="secondary" />
      </IconButton>
    </div >
  );
}

export default Timer;
