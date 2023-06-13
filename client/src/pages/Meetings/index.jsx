import Calendar from '../../components/Calendar';

function Meetings() {

  const handleGoogleLogin = () => {
    window.location.href = 'http://34.220.229.58:5000/api/google';
  };

  return (
    <div>
      <button type='button' onClick={handleGoogleLogin}>Login with Google</button>
      <Calendar />
    </div>
  )
}

export default Meetings