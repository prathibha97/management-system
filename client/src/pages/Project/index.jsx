import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectCurrentUser } from '../../app/features/auth/authSelectors';
import { useGetProjectByIdQuery } from '../../app/features/projects/projectApiSlice';
import { Loader } from '../../components';
import decodeBase64ToPDF from '../../utils/decodeBase64ToPDF';

function Project() {

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectCurrentUser);
  const { id } = useParams();

  const { data: project, isLoading: isProjectLoading } = useGetProjectByIdQuery(id)
  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        // dispatch(ProjectDetailsById(id))
      }
    }
  }, [userInfo])

  if (isProjectLoading) return <Loader />

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