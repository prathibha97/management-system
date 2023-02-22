
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { markAttendance } from '../../redux/actions/attendanceActions';
import AccountMenu from '../AccountMenu';
import Button from '../Button';

function Header() {
  const location = useLocation();
  const dispatch = useDispatch()
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  // const [project, setProject] = useState('');

  // Get attendanceMark state from the Redux store
  const attendanceMark = useSelector((state) => state.markAttendance);
  const { error } = attendanceMark;

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

  let dropdown;
  if (location.pathname === '/board') {
    dropdown = (
      <select className="ml-3 bg-gray-100 border border-gray-300 outline-none py-1 px-3 rounded-md text-xs">
        <option value={null}>Select a project</option>
        <option value="project1">Project 1</option>
        <option value="project2">Project 2</option>
        <option value="project3">Project 3</option>
      </select>
    );
  }


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
    default:
      heading = 'Unknown Page';
      break;
  }

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  // const handleProjectChange = (event) => {
  //   setProject(event.target.value);
  // };


  return (
    <div className="flex items-center justify-between px-10 pt-2">
      <div className='flex gap-2 items-center'>
        <div className="text-3xl font-semibold">{heading}</div>
        {/* {heading === 'Board' && (
          <div className="flex items-center">
            <Select value={project} onChange={handleProjectChange}>
              <MenuItem value="">Select Project</MenuItem>
              <MenuItem value="project1">Project 1</MenuItem>
              <MenuItem value="project2">Project 2</MenuItem>
              <MenuItem value="project3">Project 3</MenuItem>
            </Select>
          </div>
        )} */}
        {dropdown}
      </div>
      <div className="flex items-center gap-10">
        <Button title="Log Time" onClick={handleMarkAttendance} />
        <FontAwesomeIcon icon={faBell} />
        <AccountMenu />
      </div>
      <Snackbar open={alert?.open} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert?.severity}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Header;
