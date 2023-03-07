/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */

import { faClock } from '@fortawesome/free-solid-svg-icons';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Alert, Badge, FormControl, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { markAttendance } from '../../redux/actions/attendanceActions';
import { ProjectDetailsById } from '../../redux/actions/projectActions';
import AccountMenu from '../AccountMenu';
import Button from '../Button';

function Header() {
  const location = useLocation();
  const dispatch = useDispatch()
  // Get attendanceMark state from the Redux store
  const attendanceMark = useSelector((state) => state.markAttendance);
  const { error } = attendanceMark;

  const userProjectDetails = useSelector((state) => state.userProjectDetails);
  const { projects } = userProjectDetails

  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [project, setProject] = useState(projects.length > 0 ? projects[0]?._id : '');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  Pusher.logToConsole = true;

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { token } = userInfo;
  const { empNo } = userInfo.employee;
  // console.log(token); // prints the token value


  const pusher = new Pusher('32527c1cf3eeb5dc061a', {
    cluster: 'ap2',
    authEndpoint: 'http://localhost:5000/pusher/auth',
    auth: {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  });

  useEffect(() => {
    const channel = pusher.subscribe(`private-${empNo}`);

    channel.bind('leave-approved', (data) => {
      setNotifications((notifications) => [...notifications, data]);
    });
    channel.bind('leave-rejected', (data) => {
      setNotifications((notifications) => [...notifications, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  const handleNotificationClick = () => {
    setNotifications([]);
  }

  const handleMarkAttendance = () => {
    try {
      dispatch(markAttendance());
      setAlert({ open: true, message: 'Attendance marked successfully', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' });
    }
  };
  useEffect(() => {
    if (error) {
      setAlert({ open: true, message: error, severity: 'error' });
    }
  }, [error]);

  const handleProjectChange = (event) => {
    const selectedProject = event.target.value;
    setProject(selectedProject?._id);
    dispatch(ProjectDetailsById(selectedProject?._id))
  };

  let heading;
  switch (location.pathname) {
    case '/dashboard':
      heading = 'Dashboard';
      break;
    case '/profile':
      heading = 'Profile';
      break;
    case '/board':
      heading = 'Board';
      break;
    case '/attendance':
      heading = 'Attendance';
      break;
    case '/leave':
      heading = 'Leave';
      break;
    case '/settings':
      heading = 'Settings';
      break;
    case '/people':
      heading = 'Manage People';
      break;
    case '/payroll':
      heading = 'Manage Payroll';
      break;
    case '/projects':
      heading = 'Manage Projects';
      break;
    case '/leaves':
      heading = 'Manage Leaves';
      break;
    case '/register':
      heading = 'Register New Employee';
      break;
    default:
      heading = 'Unknown Page';
      break;
  }

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <div className="flex items-center justify-between px-10 pt-2">
      <div className='flex gap-2 items-center'>
        <div className="text-3xl font-semibold">{heading}</div>
        {heading === 'Board' && (
          <div className="flex items-center">
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="Select Project">Select Project</InputLabel>
              <Select
                onChange={handleProjectChange}
                labelId="Select Project"
                label="Select Project"
                value={project?._id || ''}
              >
                {projects && projects.length > 0 ? projects.map((item) => (
                  <MenuItem key={item._id} value={item}>{item?.title}</MenuItem>
                )) : <MenuItem disabled>No Projects Found</MenuItem>}
              </Select>
            </FormControl>

          </div>
        )}
      </div>
      <div className="flex items-center gap-10">
        <Button title="Log Time" onClick={handleMarkAttendance} icon={faClock} />
        <Badge badgeContent={notifications.length} color='secondary'>
          <NotificationsIcon color='action' onClick={handleNotificationClick} />
        </Badge>
        <AccountMenu />
      </div>
      <Snackbar open={alert?.open} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert?.severity}>
          {alert?.message}
        </Alert>
      </Snackbar>
      {notifications.map(notification => (
        <Snackbar key={notification.id} open={showNotifications} autoHideDuration={5000} onClose={() => setShowNotifications(false)}>
          <Alert onClose={() => setShowNotifications(false)} severity={notification.severity}>
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
}

export default Header;
