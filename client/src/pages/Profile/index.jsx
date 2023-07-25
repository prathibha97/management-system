import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../app/features/auth/authSelectors';
import { useEmployeeProfileQuery } from '../../app/features/employees/employeeApiSlice';
import { setEmployeeProfile } from '../../app/features/employees/employeeSlice';
import { useGetUserExperiencesQuery } from '../../app/features/experiences/experienceApiSlice';
import { EmployeeCard, ExperienceCard, Loader } from '../../components';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [experienceChangeCount, setExperienceChangeCount] = useState(0);

  const userInfo = useSelector(selectCurrentUser);

  const { data: experiences, isLoading: isExperiencesLoading, isFetching: isExperiencesFetching } = useGetUserExperiencesQuery(userInfo?.empNo, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    retryOnMount: true,
    keepUnusedDataFor: 10 // Number of seconds to keep unused data for
  });

  const { data: user, isLoading: isProfileLoading, refetch: refetchProfile } = useEmployeeProfileQuery(userInfo?.empNo);

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('userInfo'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(setEmployeeProfile(userInfo?.empNo));
      }
    }
  }, [userInfo, dispatch, navigate]);

  useEffect(() => {
    refetchProfile();
  }, [experienceChangeCount, experiences, refetchProfile]);

  if (!user || isProfileLoading || isExperiencesLoading || isExperiencesFetching) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col lg:flex-row h-[90vh]">
      <div className="flex flex-col lg:w-1/2">
        <EmployeeCard employee={user} />
      </div>
      <div className="flex flex-col lg:w-1/2">
        <ExperienceCard employee={user} setExperienceChangeCount={setExperienceChangeCount} />
      </div>
    </div>
  );
}

export default Profile;
