import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataTable, Loader } from '../../components';
import { getAttendanceDetailsbyId } from '../../redux/actions/attendanceActions';
import { getUserDetails } from '../../redux/actions/userActions';

function Attendance() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin

  const {attendanceInfo} = useSelector((state) => state.attendanceDetails);

  const { user } = useSelector((state) => state.userDetails) || {}
  useEffect(()=>{
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(getUserDetails(userInfo.employee.empNo));
        dispatch(getAttendanceDetailsbyId(userInfo.employee.empNo));
      }
    }
  }, [userInfo])

  if (!user) {
    return <Loader />
  }
  return (
    <div className='mt-5'>
      <DataTable data={attendanceInfo}/>
    </div>
  );
}

export default Attendance;
