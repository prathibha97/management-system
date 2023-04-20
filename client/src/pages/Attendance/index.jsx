import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetEmployeeAttendanceQuery } from '../../app/features/attendance/attendanceApiSlice';
import { setEmployeeAttendance } from '../../app/features/attendance/attendanceSlice';
import { selectCurrentUser } from '../../app/features/auth/authSelectors';
import { DataTable, Loader } from '../../components';
import formatTime from '../../utils/formatTime';
import roundToTwoDecimals from '../../utils/roundToTwoDecimals';

function Attendance() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector(selectCurrentUser)

  const { data: attendanceInfo, isLoading } = useGetEmployeeAttendanceQuery(userInfo.empNo)

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUserInfo = JSON.parse(localStorage.getItem('user'));
      if (!storedUserInfo || storedUserInfo.empNo !== userInfo.empNo) {
        dispatch(setEmployeeAttendance({ attendanceInfo }))
      }
    }
  }, [userInfo])

  if (isLoading) {
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
