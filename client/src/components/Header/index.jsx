import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { markAttendance } from '../../redux/actions/attendanceActions';
import AccountMenu from '../AccountMenu';
import LogTimeButton from '../LogTimeButton';

function Header() {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Get userInfo state from the Redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin

  useEffect(() => {
    // If userInfo state is not available in the Redux store, navigate to the login page
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo])

  const handleMarkAttendance = () => {
    dispatch(markAttendance());
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
    case '/settings':
      heading = 'Settings';
      break;
    default:
      heading = 'Unknown Page';
      break;
  }

  return (
    <div className="flex items-center justify-between px-10 pt-5">
      <div className="text-3xl font-semibold">{heading}</div>
      <div className="flex items-center gap-10">
        <LogTimeButton onClick={handleMarkAttendance}/>
        <FontAwesomeIcon icon={faBell} />
        <AccountMenu />
      </div>
    </div>
  );
}

export default Header;

