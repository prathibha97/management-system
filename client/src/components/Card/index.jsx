/* eslint-disable react/destructuring-assignment */
import { faCircle, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, AvatarGroup } from "@mui/material";

function Card({ task }) {
  return (
    <div className='p-1 rounded-lg'>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCircle} className="text-[8px]" />
          <p>tag</p>
        </div>
        <FontAwesomeIcon icon={faEllipsis} />
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <h1 className="font-semibold">{task.title}</h1>
        <p className="text-xs">{task.description}</p>
      </div>
      {/* TODO: loop through asignees */}
      <div className="flex justify-start">
        {/* {task.assignee} */}
        <AvatarGroup max={4}>
          {task?.assignee?.map((assignee, index) => (
            <Avatar key={index} alt="Remy Sharp" sx={{ width: 24, height: 24 }} />
          ))}
        </AvatarGroup>
      </div>
    </div>
  )
}

export default Card
