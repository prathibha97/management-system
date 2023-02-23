/* eslint-disable no-underscore-dangle */

import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, FormControl, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
  const [project, setProject] = useState({});



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
    const selectedProject = event.target.value || {};
    setProject(selectedProject);
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
              <Select onChange={handleProjectChange} labelId="Select Project" autoWidth
                label="Age" value={project?._id}>
                {projects?.map((item) => (
                  <MenuItem key={item._id} value={item}>{item?.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
        {/* {dropdown} */}
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
