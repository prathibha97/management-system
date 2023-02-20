/* eslint-disable react/jsx-props-no-spreading */
// import { faBell } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { markAttendance } from '../../redux/actions/attendanceActions';
// import AccountMenu from '../AccountMenu';
// import LogTimeButton from '../LogTimeButton';

// function Header() {
//   const location = useLocation();
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   // Get userInfo state from the Redux store
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin

//   useEffect(() => {
//     // If userInfo state is not available in the Redux store, navigate to the login page
//     if (!userInfo) {
//       navigate('/');
//     }
//   }, [userInfo])

//   const handleMarkAttendance = () => {
//     dispatch(markAttendance());
//   };

//   let heading;
//   switch (location.pathname) {
//     case '/dashboard':
//       heading = 'Dashboard';
//       break;
//     case '/profile':
//       heading = 'Profile';
//       break;
//     case '/board':
//       heading = 'Board';
//       break;
//     case '/attendance':
//       heading = 'Attendance';
//       break;
//     case '/settings':
//       heading = 'Settings';
//       break;
//     default:
//       heading = 'Unknown Page';
//       break;
//   }

//   return (
//     <div className="flex items-center justify-between px-10 pt-5">
//       <div className="text-3xl font-semibold">{heading}</div>
//       <div className="flex items-center gap-10">
//         <LogTimeButton onClick={handleMarkAttendance}/>
//         <FontAwesomeIcon icon={faBell} />
//         <AccountMenu />
//       </div>
//     </div>
//   );
// }

// export default Header;


import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { markAttendance } from '../../redux/actions/attendanceActions';
import AccountMenu from '../AccountMenu';
import LogTimeButton from '../LogTimeButton';



function Header() {
  const location = useLocation();
  const dispatch = useDispatch()
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  // Get attendanceMark state from the Redux store
  const attendanceMark = useSelector((state) => state.markAttendance);
  const {  error } = attendanceMark;

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
    <div className="flex items-center justify-between px-10 pt-5">
      <div className="text-3xl font-semibold">{heading}</div>
      <div className="flex items-center gap-10">
        <LogTimeButton onClick={handleMarkAttendance} />
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
