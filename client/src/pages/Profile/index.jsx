import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EmployeeCard, ExperienceCard, Loader } from '../../components';
import { selectCurrentUser } from '../../features/auth/authSelectors';
import { useGetUserExperiencesQuery } from '../../features/experiences/experienceApiSlice';
import { setEmployeeProfile } from '../../features/employees/employeeSlice';
import { useEmployeeProfileQuery } from '../../features/employees/employeeApiSlice';


function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [experienceChangeCount, setExperienceChangeCount] = useState(0)

  const userInfo = useSelector(selectCurrentUser)

  const { data: experiences, isLoading } = useGetUserExperiencesQuery(userInfo?.empNo)
  const { data: user, isLoading: isProfileLoading } = useEmployeeProfileQuery(userInfo?.empNo)

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
      } else {
        const storedUser = JSON.parse(localStorage.getItem('userInfo'));
        if (!storedUser || storedUser.empNo !== userInfo.empNo) {
          dispatch(setEmployeeProfile(userInfo?.empNo));
        }
    }
  }, [userInfo, experiences, experienceChangeCount])


  if (!user || isLoading || isProfileLoading) {
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
