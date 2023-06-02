import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SelectLatestProjects } from '../../app/features/timeRecords/timeRecordSelectors';
import { startTimer } from '../../app/features/timer/timerSlice';

function RecentlyActiveProjects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector(SelectLatestProjects);

  const handleStartWorking = () => {
    dispatch(startTimer());
  };

  return (
    <div>
      {projects?.map((project) => (
        <div className="flex justify-between items-center w-full bg-white py-2 px-3 rounded my-2" key={project._id}>
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
              <IconButton onClick={handleStartWorking}>
                <PlayArrowIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentlyActiveProjects;
