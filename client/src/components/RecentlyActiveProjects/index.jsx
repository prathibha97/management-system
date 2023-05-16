import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function RecentlyActiveProjects() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center m-auto bg-white py-2 px-3 rounded">
      <div className="flex items-center mr-9">
        <span className="w-4 h-4 p-1 rounded bg-[#f8bbd0]" />

        <div className="ml-2 text-lg font-semibold">PROJECT NAME</div>
      </div>
      <div className="flex items-center">
        <div className="mr-2 text-xs text-gray-600">Last active:</div>
        <div className="text-xs text-gray-600">Yesterday</div>
      </div>
      <div className="flex ml-4">
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
  );
}

export default RecentlyActiveProjects;
