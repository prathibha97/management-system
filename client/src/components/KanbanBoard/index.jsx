/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */

import { faEllipsis, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getBoardsByProjectId } from '../../redux/actions/boardActions'
import { getUserProjectDetails } from '../../redux/actions/projectActions'
import { updateTask } from '../../redux/actions/taskActions'
import AddTaskModal from '../AddTaskModal'
import Card from '../Card'
import Loader from '../Loader'

function Kanban() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin

  const { user } = useSelector((state) => state.userDetails) || {}
  const projectDetailsById = useSelector((state) => state.projectDetailsById) || {};
  const { project } = projectDetailsById

  const projectBoardDetails = useSelector((state) => state.projectBoardDetails) || [];
  const { boards, loading } = projectBoardDetails

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(getUserProjectDetails())
        if (project && project._id) {
          dispatch(getBoardsByProjectId(project?._id))
        }
      }
    }
  }, [userInfo, project])

  const [showCreateForms, setShowCreateForms] = useState([]);
  const [isBoardHovered, setIsBoardHovered] = useState(false);

  // Initialize the showCreateForms array with false values for each board
  useEffect(() => {
    setShowCreateForms(new Array(boards.length).fill(false));
  }, [boards]);

  if (!user || !project || loading) {
    return <Loader />
  }

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceBoard = boards.find(board => board._id === source.droppableId);
    const destinationBoard = boards.find(board => board._id === destination.droppableId);
    const sourceTasks = [...sourceBoard.tasks];
    const destinationTasks = [...destinationBoard.tasks];
    const task = sourceTasks[source.index];

    sourceTasks.splice(source.index, 1);
    destinationTasks.splice(destination.index, 0, task);

    const newBoards = [...boards];
    const newSourceBoard = newBoards.find(board => board._id === source.droppableId);
    const newDestinationBoard = newBoards.find(board => board._id === destination.droppableId);
    newSourceBoard.tasks = sourceTasks;
    newDestinationBoard.tasks = destinationTasks;

    try {
      // Update the destinationBoard object before dispatching the updateTask action
      const updatedTask = {
        ...task,
        boardId: destinationBoard._id,
      };
      await dispatch(updateTask(task._id, updatedTask));
    } catch (err) {
      console.log(err);
      // If there's an error, undo the changes made to the local state
      newSourceBoard.tasks = [...sourceTasks, task];
      newDestinationBoard.tasks = destinationTasks.filter(t => t._id !== task._id);
    }
  };

  if (boards.length === 0) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
    <h1 className='text-center'>Select a project to view the boards!</h1>
  </div>


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex items-start justify-between mt-10 m-auto gap-10 w-[1400px]">
        {boards?.map((section, index) => (
          <Droppable
            key={section?._id}
            droppableId={section?._id}
            style={{ height: '670px' }}
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                className='w-[100%] bg-[#EEF2F5] rounded-xl p-4 overflow-y-auto max-h-[670px]'
                ref={provided.innerRef}
                onMouseEnter={() => {
                  setIsBoardHovered(section._id)
                }
                }
                onMouseLeave={() => setIsBoardHovered(null)}
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
                          className={`bg-white rounded-lg shadow p-4 transition-opacity ${snapshot.isDragging ? 'opacity-50' : ''}`}
                        >
                          <Card
                            task={task}
                            boardId={section?._id}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {isBoardHovered === section._id && (
                  <div className="mt-4">
                    <div
                      className={`flex items-center justify-center p-2 gap-2 cursor-pointer rounded-md hover:bg-[#E2E4EA] ${showCreateForms[index] ? 'hidden' : ''}`}
                      onClick={() => setShowCreateForms(prev => {
                        const newState = [...prev];
                        newState[index] = true;
                        return newState;
                      })}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      <p>Create Task</p>
                    </div>
                    {showCreateForms[index] && (
                      <AddTaskModal boardId={section._id} open={showCreateForms} handleClose={() => setShowCreateForms(prev => {
                        const newState = [...prev];
                        newState[index] = false;
                        return newState;
                      })} />
                    )}
                  </div>
                )}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );

}

export default Kanban