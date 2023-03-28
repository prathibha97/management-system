import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApplyLeave, LeaveInformation, Loader } from '../../components';
import { getUserLeaveDetails } from '../../redux/actions/leaveActions';
import { getUserDetails } from '../../redux/actions/userActions';

function Leave() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetails) || {}

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const leaveDetails = useSelector((state) => state.leaveDetails)
  const { leaves , loading} = leaveDetails

  const [leaveChangeCount, setLeaveChangeCount] = useState(0);

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(getUserDetails(userInfo?.employee.empNo));
        dispatch(getUserLeaveDetails(userInfo?.employee.empNo));
      }
    }
  }, [userInfo, leaves])

  // Second useEffect hook to get meetings again and reset meetingChangeCount
  useEffect(() => {
    dispatch(getUserLeaveDetails(userInfo?.employee.empNo))
    setLeaveChangeCount(0);
  }, [dispatch, leaveChangeCount])

  if (!user || loading) {
    return <Loader />
  }

  return (
    <div className="flex h-[90vh]">
      <div className="flex flex-col flex-1">
        <LeaveInformation user={user} leaves={leaves}/>
      </div>
      <div className="flex flex-col flex-1">
        <ApplyLeave user={user} setLeaveChangeCount={setLeaveChangeCount}/>
      </div>
    </div>
  )
}

export default Leave