import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataTable, Loader } from '../../components';
import { getAttendanceDetailsbyId } from '../../redux/actions/attendanceActions';
import { getUserDetails } from '../../redux/actions/userActions';
import formatTime from '../../utils/formatTime';
import roundToTwoDecimals from '../../utils/roundToTwoDecimals';

function Attendance() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userInfo} = useSelector((state) => state.userLogin);
  const {employee} = userInfo

  const { attendanceInfo ,loading} = useSelector((state) => state.attendanceDetails);

  const { user } = useSelector((state) => state.userDetails) || {}
  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUserInfo = JSON.parse(localStorage.getItem('user'));
      if (!storedUserInfo || storedUserInfo.empNo !== userInfo.empNo) {
        dispatch(getUserDetails(employee.empNo));
        dispatch(getAttendanceDetailsbyId(employee.empNo));
      }
    }
  }, [userInfo])

  if (!user || loading) {
    return <Loader />
  }

  const attendanceColumns = [
    { id: 'date', label: 'Date', minWidth: 90, align: 'center', },
    {
      id: 'inTime',
      label: 'In Time',
      minWidth: 90,
      align: 'center',
      format: (value) => formatTime(value),
    },
    {
      id: 'outTime',
      label: 'Out Time',
      minWidth: 90,
      align: 'center',
      format: (value) => formatTime(value),
    },
    {
      id: 'workHours',
      label: 'Worked Hours',
      minWidth: 90,
      align: 'center',
      format: (value) => roundToTwoDecimals(value)
    },
    {
      id: 'overtimeHours',
      label: 'Overtime Hours',
      minWidth: 90,
      align: 'center',
      format: (value) => roundToTwoDecimals(value)
    },
  ];

  return (
    <div className='mt-5'>
      <DataTable data={attendanceInfo} columns={attendanceColumns} />
    </div>
  );
}

export default Attendance;
