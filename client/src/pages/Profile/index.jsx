import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EmployeeCard, ExperienceCard, Loader } from '../../components';
import { getUserDetails } from '../../redux/actions/userActions';


function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetails) || {}

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(getUserDetails(userInfo.employee.empNo));
      }
    }
  }, [userInfo])

  if (!user) {
    return <Loader />
  }

  return (
    <div className="flex h-[100vh]">
      <div className="flex flex-col flex-1">
        <EmployeeCard employee={user} />
      </div>
      <div className="flex flex-col flex-1">
        <ExperienceCard employee={user} />
      </div>
    </div>
  );
}

export default Profile;
