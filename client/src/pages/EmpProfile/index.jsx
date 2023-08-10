// /* eslint-disable no-restricted-globals */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectCurrentUser } from '../../app/features/auth/authSelectors';
import { useEmployeeDetailsAdminQuery } from '../../app/features/employees/employeeApiSlice';
import { setEmployeeDetailsAdmin } from '../../app/features/employees/employeeSlice';
import {
  AdminLeaveAllocation,
  AttendanceCalendar,
  EmployeeDetails,
  LeaveBalance,
  Loader,
  ProjectHistory,
  SalaryDetails,
} from '../../components';

function EmpProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectCurrentUser);
  const { empNo } = useParams();

  const { data: user, isLoading: isUserdetailsLoading } =
    useEmployeeDetailsAdminQuery(empNo, {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

  console.log(`user empPage - ${user}`);

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('userInfo'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(setEmployeeDetailsAdmin({ employee: user }));
      }
    }
  }, []);

  if (isUserdetailsLoading) return <Loader />;
  return (
    <div className="h-[90%]">
      <div className="bg-[#EEF2F5]  w-[95%] rounded-xl mt-6 m-auto overflow-y-auto">
        <EmployeeDetails user={user} />
        <div className="lg:flex">
          <AttendanceCalendar user={user} />
          <AdminLeaveAllocation empNo={empNo} />
        </div>
        <LeaveBalance user={user} />
        <SalaryDetails />
        <ProjectHistory user={user} />
      </div>
    </div>
  );
}

export default EmpProfile;
