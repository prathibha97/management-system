import React from 'react';

function ProjectHistory({ user }) {
  console.log(user);
  return (
    <div>
      {user?.projectHistory?.map((project) => (
        <div key={project._id}>
          project name: {project?.project?.title}
        </div>
      ))}
    </div>
  )
}

export default ProjectHistory