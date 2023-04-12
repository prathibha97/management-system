/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login, OTPInput, ResetPassword } from '../../components';

function Auth() {
  const [page, setPage] = useState('login');
  const navigate = useNavigate();

  function checkUserInfo() {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate('/dashboard');
    }
  }

  useEffect(checkUserInfo, []);

  function NavigateComponents() {
    switch (page) {
      case 'login':
        return <Login setPage={setPage} />;
      case 'otp':
        return <OTPInput setPage={setPage} />;
      case 'reset':
        return <ResetPassword setPage={setPage} />;
      default:
        return null;
    }
  }

  return (
    <div>
      <NavigateComponents />
    </div>
  );
}

export default Auth;