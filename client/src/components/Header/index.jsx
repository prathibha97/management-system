/* eslint-disable import/no-cycle */
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Alert, FormControl, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AccountMenu, Button, Notifications, Timer } from "..";
import { useGetEmployeeAttendanceQuery, useLazyMarkAttendanceQuery } from '../../app/features/attendance/attendanceApiSlice';
import { setEmployeeAttendance, setMarkAttendance } from '../../app/features/attendance/attendanceSlice';
import { selectCurrentUser } from '../../app/features/auth/authSelectors';
import { useGetEmployeeProjectsQuery } from '../../app/features/projects/projectApiSlice';
import { setProjects, setSelectedProject } from '../../app/features/projects/projectSlice';

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.pathname.split('/')[2];
  const userInfo = useSelector(selectCurrentUser);

  const { data: projects, refetch: refetchProjects } = useGetEmployeeProjectsQuery({});
  const { data: attendanceInfo, refetch: refetchAttendance } = useGetEmployeeAttendanceQuery(userInfo?.empNo);
  const [trigger, { data: attendance, error: markAttendanceError }] = useLazyMarkAttendanceQuery();

  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [project, setProject] = useState('');
  const [attendanceChangeCount, setAttendanceChangeCount] = useState(0);

  useEffect(() => {
    dispatch(setProjects({ projects }));
  }, []);

  useEffect(() => {
    if (projects?.length > 0) {
      setProject(projects[0]?._id);
      dispatch(setSelectedProject({ project: projects[0] }));
    }
  }, [projects, dispatch]);

  useEffect(() => {
    if (location.pathname === '/board') {
      refetchProjects();
      dispatch(setProjects({ projects }));
    }
  }, [location.pathname, refetchProjects]);

  const handleMarkAttendance = () => {
    try {
      trigger().unwrap();
      dispatch(setMarkAttendance({ attendance }));
      setAttendanceChangeCount((count) => count + 1);
      setAlert({ open: true, message: 'Attendance marked successfully', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: markAttendanceError?.data?.message, severity: 'error' });
    }
  };

  useEffect(() => {
    if (alert?.severity === 'error') {
      setAttendanceChangeCount((count) => count - 1);
    }
  }, [alert?.severity]);

  useEffect(() => {
    refetchAttendance();
    dispatch(setEmployeeAttendance({ attendanceInfo }));
    setAttendanceChangeCount(0);
  }, [attendanceChangeCount, attendanceInfo]);

  const handleProjectChange = (event) => {
    const selectedProject = event.target.value;
    setProject(selectedProject?._id);
    dispatch(setSelectedProject({ project: selectedProject }));
  };

  const getPageHeading = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/meetings':
        return 'Schedule / Join Meetings';
      case '/timesheet':
      case '/admin/timesheet':
        return 'Time Sheet';
      case '/profile':
        return 'Profile';
      case '/board':
        return 'Project Boards';
      case '/attendance':
        return 'Attendance Sheet';
      case '/leave':
        return 'Apply Leave';
      case '/settings':
        return 'Settings';
      case '/people':
        return 'Manage People';
      case '/clients':
        return 'Manage Clients';
      case '/clients/register':
        return 'Register New Client';
      case `/clients/${id}`:
        return 'Client Profile';
      case `/people/${id}`:
        return 'Employee Profile';
      case '/payroll':
        return 'Manage Payroll';
      case '/projects':
        return 'Manage Projects';
      case `/projects/create`:
        return 'New Project';
      case `/projects/${id}`:
        return 'Project Info';
      case '/leaves':
        return 'Manage Leaves';
      case '/register':
        return 'Register New Employee';
      case '/reset-password':
        return 'Reset Password';
        case '/admin/invoice':
          return 'Invoice Generator'
      default:
        return 'Unknown Page';
    }
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  const isProjectBoardsPage = location.pathname === '/board';

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-10 pt-2">
      <div className="flex flex-col lg:flex-row gap-2 items-center">
        <div className="text-3xl font-semibold hidden lg:block">{getPageHeading()}</div>
        {isProjectBoardsPage && (
          <div className="flex items-center">
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="select-project-label">Select Project</InputLabel>
              <Select
                onChange={handleProjectChange}
                labelId="select-project-label"
                label="Select Project"
                value={project}
                renderValue={(value) => value ? value?.title : ''}
                displayEmpty
              >
                {projects?.map((item) => (
                  <MenuItem key={item._id} value={item}>{item?.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
      </div>
      <div className="flex items-center gap-5 lg:gap-10">
        <Timer />
        <Button title="Log Time" onClick={handleMarkAttendance} icon={faClock} />
        <Notifications empNo={userInfo?.empNo} />
        <AccountMenu userInfo={userInfo} />
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
