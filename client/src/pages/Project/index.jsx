import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectDetailsById } from '../../redux/actions/projectActions';
import { Loader } from '../../components';
import decodeBase64ToPDF from '../../utils/decodeBase64ToPDF';

function Project() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { project, loading } = useSelector((state) => state.projectDetailsById);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {id} = useParams();
  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(ProjectDetailsById(id))
      }
    }
  }, [userInfo])

  if (loading) return <Loader />

  const handleDecode = () => {
    decodeBase64ToPDF(project?.scope)

  }
  return (
    <div>
      <h1>{project?.title}</h1>
      <button type='button' onClick={handleDecode}>view scope</button>
    </div>
  )
}

export default Project