import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EmployeeCard, ExperienceCard, Loader } from '../../components';
import { getUserDetails } from '../../redux/actions/userActions';


function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [experienceChangeCount, setExperienceChangeCount] = useState(0)

  const { user } = useSelector((state) => state.userDetails) || {}

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const { experiences, loading } = useSelector((state) => state.getExperience)


  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(getUserDetails(userInfo?.employee?.empNo));
      }
    }
  }, [userInfo, experiences, experienceChangeCount])


  if (!user || loading) {
    return <Loader />
  }

  return (
    <div className="flex h-[90vh]">
      <div className="flex flex-col flex-1">
        <EmployeeCard employee={user} />
      </div>
      <div className="flex flex-col flex-1">
        <ExperienceCard employee={user} setExperienceChangeCount={setExperienceChangeCount}/>
      </div>
    </div>
  );
}

export default Profile;
