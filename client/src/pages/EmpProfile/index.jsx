import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AttendanceCalendar, EmployeeDetails, LeaveBalance, Loader, SalaryDetails } from '../../components';
import { getUserDetailsAdmin } from '../../redux/actions/userActions';

function EmpProfile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin
  const { empNo } = useParams();
  const { user, loading } = useSelector((state) => state.userDetailsAdmin);


  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(getUserDetailsAdmin(empNo))
      }
    }
  }, [userInfo])

  if (loading) return <Loader />
  return (
    <div className='h-[90%]'>
      <div className='bg-[#EEF2F5]  w-[95%] rounded-xl mt-6 m-auto overflow-y-auto'>
        <EmployeeDetails user={user} />
        <AttendanceCalendar user={user} />
        <LeaveBalance user={user} />
        <SalaryDetails />
      </div>
    </div>
  )
}

export default EmpProfile