import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EmployeeCard, ExperienceCard, Loader } from '../../components';
import { selectCurrentUser } from '../../features/auth/authSelectors';
import { useEmployeeProfileQuery } from '../../features/employees/employeeApiSlice';
import { setEmployeeProfile } from '../../features/employees/employeeSlice';
import { useGetUserExperiencesQuery } from '../../features/experiences/experienceApiSlice';


function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [experienceChangeCount, setExperienceChangeCount] = useState(0)

  const userInfo = useSelector(selectCurrentUser)

  const { data: experiences, isLoading, isFetching } = useGetUserExperiencesQuery(userInfo?.empNo, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    retryOnMount: true,
    keepUnusedDataFor: 10 // Number of seconds to keep unused data for
  });

  const { data: user, isLoading: isProfileLoading, refetch } = useEmployeeProfileQuery(userInfo?.empNo)
  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      const storedUser = JSON.parse(localStorage.getItem('userInfo'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(setEmployeeProfile(userInfo?.empNo));
      }
    }
  }, [userInfo])

  useEffect(() => {
    refetch()
  }, [experienceChangeCount, experiences])

  if (!user || isLoading || isProfileLoading || isFetching) {
    return <Loader />
  }

  return (
    <div className="flex h-[90vh]">
      <div className="flex flex-col flex-1">
        <EmployeeCard employee={user} />
      </div>
      <div className="flex flex-col flex-1">
        <ExperienceCard employee={user} setExperienceChangeCount={setExperienceChangeCount} />
      </div>
    </div>
  );
}

export default Profile;
