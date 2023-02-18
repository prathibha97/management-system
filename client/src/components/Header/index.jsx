import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useLocation } from 'react-router-dom';
import AccountMenu from '../AccountMenu';
import LogTimeButton from '../LogTimeButton';

function Header() {
  const location = useLocation();

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
        <LogTimeButton />
        <FontAwesomeIcon icon={faBell} />
        <AccountMenu />
      </div>
    </div>
  );
}

export default Header;

