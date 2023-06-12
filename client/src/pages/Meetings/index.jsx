import Calendar from '../../components/Calendar';

function Meetings() {

  const handleGoogleLogin = () => {
    window.location.href = 'http://34.210.201.75:5000/api/google';
  };

  return (
    <div>
      <button type='button' onClick={handleGoogleLogin}>Login with Google</button>
      <Calendar />
    </div>
  )
}

export default Meetings