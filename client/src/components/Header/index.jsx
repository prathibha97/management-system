/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */

import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Alert, FormControl, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { AccountMenu, Button, Notifications } from '../../components';
import { markAttendance } from '../../redux/actions/attendanceActions';
import { ProjectDetailsById } from '../../redux/actions/projectActions';
import { getUserDetailsAdmin } from '../../redux/actions/userActions';

function Header() {
  const location = useLocation();
  const dispatch = useDispatch()
  const { empNo: id } = useParams()
  // Get attendanceMark state from the Redux store
  const attendanceMark = useSelector((state) => state.markAttendance);
  const { error } = attendanceMark;

  const userProjectDetails = useSelector((state) => state.userProjectDetails);
  const { projects } = userProjectDetails

  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [project, setProject] = useState(projects.length > 0 ? projects[0]?._id : '');

  const { user } = useSelector((state) => state.userDetailsAdmin);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { empNo } = userInfo.employee;

  const handleMarkAttendance = () => {
    try {
      dispatch(markAttendance());
      setAlert({ open: true, message: 'Attendance marked successfully', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' });
    }
  };
  useEffect(() => {
    dispatch(getUserDetailsAdmin(id));
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
      heading = 'Project Boards';
      break;
    case '/attendance':
      heading = 'Attendance Sheet';
      break;
    case '/leave':
      heading = 'Apply Leave';
      break;
    case '/settings':
      heading = 'Settings';
      break;
    case '/people':
      heading = 'Manage People';
      break;
    case `/people/${id}`:
      heading = `${user?.name?.first}'s Profile`;
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
        {heading === 'Project Boards' && (
          <div className="flex items-center">
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="Select Project">Select Project</InputLabel>
              <Select
                onChange={handleProjectChange}
                labelId="Select Project"
                label="Select Project"
                value={project?._id || ''}
                renderValue={(value) => value ? value?.title : ''}
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
        <Notifications empNo={empNo} />
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
