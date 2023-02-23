/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserProjectDetails } from '../../redux/actions/projectActions'
// import mockData from '../../data/mockData'
import Card from '../Card'
import Loader from '../Loader'

function Kanban() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin
  const { user } = useSelector((state) => state.userDetails) || {}
  const userProjectDetails = useSelector((state) => state.userProjectDetails);
  const { projects } = userProjectDetails

  console.log(projects[0]?.boards);

  console.log(projects);

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(getUserProjectDetails())
      }
    }
  }, [userInfo])

  if (!user || !projects) {
    return <Loader />
  }

  const [data, setData] = useState('')


  const onDragEnd = result => {
    // if (!result.destination) return;
    // const { source, destination } = result;

    // if (source.droppableId === destination.droppableId) {
    //   const colIndex = data?.findIndex(e => e.id === source.droppableId);
    //   const column = data[colIndex];
    //   const newTasks = Array.from(column.tasks);
    //   const [removed] = newTasks.splice(source.index, 1);
    //   newTasks.splice(destination.index, 0, removed);

    //   const newData = [...data];
    //   newData[colIndex] = { ...column, tasks: newTasks };
    //   setData(newData);
    // } else {
    //   const sourceColIndex = data.findIndex(e => e.id === source.droppableId);
    //   const destinationColIndex = data.findIndex(e => e.id === destination.droppableId);

    //   const sourceCol = data[sourceColIndex];
    //   const destinationCol = data[destinationColIndex];

    //   const sourceTask = [...sourceCol.tasks];
    //   const destinationTask = [...destinationCol.tasks];

    //   const [removed] = sourceTask.splice(source.index, 1);
    //   destinationTask.splice(destination.index, 0, removed);

    //   const newData = [...data];
    //   newData[sourceColIndex].tasks = sourceTask;
    //   newData[destinationColIndex].tasks = destinationTask;

    //   setData(newData);
    // }
    if (!result.destination) return;
    const newTasks = [...data];
    const [removed] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, removed);
    setData(newTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex items-start justify-between mt-5 m-auto gap-10 ">
        {projects[0]?.boards?.map(section => (
          <Droppable
            key={section?._id}
            droppableId={section?._id}
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                className='w-[90%] bg-[#EEF2F5] rounded-xl p-4 overflow-y-auto max-h-[670px]'
                ref={provided.innerRef}
              >
                <div className="text-lg font-bold mb-4">
                  <div className='flex justify-between items-center'>
                    {section.title}
                    <div className='flex gap-2'>
                      <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {section?.tasks.map((task, index) => (
                    <Draggable
                      key={task?._id}
                      draggableId={task?._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-white rounded-lg shadow p-4 transition-opacity ${snapshot.isDragging ? 'opacity-50' : 'opacity-100'}`}
                        >
                          <Card task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}

export default Kanban
