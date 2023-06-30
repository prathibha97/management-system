import React from 'react';
import Calendar from '../../components/Calendar';


function GoogleLoginButton({ onClick }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      onClick={onClick}
      type='button'
    >
      Login with Google
    </button>
  );
}

function Meetings() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/google';
  };

  return (
    <div className="flex flex-col items-center">
      {/* <h1 className="text-2xl font-bold mb-6">Meetings</h1> */}
      <GoogleLoginButton onClick={handleGoogleLogin} />
      <Calendar />
    </div>
  );
}

export default Meetings;
