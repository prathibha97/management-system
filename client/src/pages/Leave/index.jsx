import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../app/features/auth/authSelectors';
import { useEmployeeProfileQuery } from '../../app/features/employees/employeeApiSlice';
import { useGetUserLeavesQuery } from '../../app/features/leaves/leaveApiSlice';
import { getUserLeaves } from '../../app/features/leaves/leaveSlice';
import { ApplyLeave, LeaveInformation, Loader } from '../../components';

function Leave() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector(selectCurrentUser)

  const { data: user, isLoading: isProfileLoading, } = useEmployeeProfileQuery(userInfo?.empNo)

  const { data: leaves, isLoading: isLeavesLoading, refetch } = useGetUserLeavesQuery(userInfo?.empNo, {
    refetchOnMountOrArgChange: true,
  })

  const [leaveChangeCount, setLeaveChangeCount] = useState(0);

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(getUserLeaves({ leaves }));
      }
    }
  }, [userInfo])

  // Second useEffect hook to get leaves again and reset leaveChangeCount
  useEffect(() => {
    refetch()
    setLeaveChangeCount(0);
  }, [leaveChangeCount])

  if (!user || isLeavesLoading || isProfileLoading) {
    return <Loader />
  }

  return (
    <div className="flex h-[90vh]">
      <div className="flex flex-col flex-1">
        <LeaveInformation user={user} leaves={leaves} />
      </div>
      <div className="flex flex-col flex-1">
        <ApplyLeave user={user} setLeaveChangeCount={setLeaveChangeCount} />
      </div>
    </div>
  )
}

export default Leave