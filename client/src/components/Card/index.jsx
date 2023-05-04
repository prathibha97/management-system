/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, AvatarGroup } from "@mui/material";
import MenuButton from "../MenuButton";

function Card({ task, refetchProjectBoards, setNumTasks }) {

  return (
    <div className='p-1 rounded-lg' key={task._id}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCircle} className="text-[8px]" />
          <p>tag</p>
        </div>
        <MenuButton id={task._id} refetchProjectBoards={refetchProjectBoards} setNumTasks={setNumTasks}
        />
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <h1 className="font-semibold">{task.title}</h1>
        <p className="text-xs">{task.description}</p>
      </div>
      <div className="flex justify-start">
        <AvatarGroup max={4}>
          {task?.assignee?.map((assignee, index) => (
            <Avatar key={index} alt="Remy Sharp" sx={{ width: 24, height: 24 }} />
            // <CustomAvatar key={index} name={`${assignee?.name?.first} ${assignee?.name?.last}`}/>
          ))}
        </AvatarGroup>
      </div>
    </div>
  )
}

export default Card
