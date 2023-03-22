import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components';

function EmpProfile() {
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin
  // const { empNo } = useParams();

  const { user, loading } = useSelector((state) => state.userDetailsAdmin);


  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        // dispatch(getUserDetailsAdmin(empNo))
      }
    }
  }, [userInfo, user])


  if(loading) return <Loader/>
  return (
    <div>{user?.name?.first}</div>
  )
}

export default EmpProfile