/* eslint-disable no-shadow */
import { AvatarGroup } from "@mui/material";
import CustomAvatar from "../CustomAvatar";
import MenuButton from "../MenuButton";

function Card({ task, refetchProjectBoards, setNumTasks, user }) {
  const { _id, title, description, assignee, tag } = task;

  // Generate a random color for the span background
  const getRandomColor = () => {
    const colors = ["#f8bbd0", "#b39ddb", "#81d4fa", "#c5e1a5", "#ffd54f"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div className="p-1 rounded-lg" key={_id}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 p-1 rounded" style={{ backgroundColor: getRandomColor() }} />
          <span>{tag}</span>
        </div>
        {user.role === "Admin" && (
          <MenuButton
            id={_id}
            refetchProjectBoards={refetchProjectBoards}
            setNumTasks={setNumTasks}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <h1 className="font-semibold">{title}</h1>
        <p className="text-xs">{description}</p>
      </div>
      <div className="flex justify-start">
        <AvatarGroup max={4}>
          {assignee?.map((assignee, index) => (
            <CustomAvatar key={index} name={`${assignee?.name?.first} ${assignee?.name?.last}`} size={30} fontSize={14} />
          ))}
        </AvatarGroup>
      </div>
    </div>
  );
}

export default Card;
