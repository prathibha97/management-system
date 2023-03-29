/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Login, OTPInput, PasswordRecovered, ResetPassword } from '../../components';

function Auth() {
  const [page, setPage] = useState('login')

  function NavigateComponents() {
    if (page === "login") return <Login setPage={setPage} />;
    if (page === "otp") return <OTPInput setPage={setPage} />;
    if (page === "reset") return <ResetPassword setPage={setPage} />;

    return <PasswordRecovered />;
  }

  return (
    <div>
      <NavigateComponents />
    </div>
  )
}

export default Auth