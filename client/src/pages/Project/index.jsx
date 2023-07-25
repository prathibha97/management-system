import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectCurrentUser } from '../../app/features/auth/authSelectors';
import { useGetProjectByIdQuery } from '../../app/features/projects/projectApiSlice';
import { FilePreview, Loader } from '../../components';

function Project() {

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectCurrentUser);
  const { id } = useParams();
  console.log(id);

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

  return (
    <div>
      <h1>{project?.title}</h1>
      <div className='flex flex-col'>
        <span className='text-[#707070]'>Project Scope</span>
        <FilePreview fileToView={project?.scope} />
      </div>
    </div>
  )
}

export default Project