const Board = require('../models/Board');
const Project = require('../models/Project');
const Employee = require('../models/Employee');
const Notification = require('../models/Notification');
const Task = require('../models/Task');
const io = require('../services/socket');

/*
?@desc   create new task
*@route  Post /api/tasks/
*@access Private
*/

const createTask = async (req, res) => {
  const { title, description, projectId, boardId, status, assignee } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      project: projectId,
      board: [{ boardId, status }],
      assignee,
    });

    // Find the board and update its tasks array
    await Board.findByIdAndUpdate(boardId, { $push: { tasks: task._id } }, { new: true }).populate(
      'tasks'
    );

    // Find the project and update its tasks array
    await Project.findByIdAndUpdate(projectId, { $push: { tasks: task._id } }, { new: true });

    // Get an array of promises to send notifications to each assigned employee
    const notificationPromises = assignee.map(async (assignedEmployeeId) => {
      const message = `${task.title} has been assigned to you.`;
      const payload = { message };
      const assignedEmployee = await Employee.findById(assignedEmployeeId);
      const channel = `private-${assignedEmployee.empNo}`;
      io.to(channel).emit('newNotification', payload);

      // Persist the notification
      const notification = {
        message,
        type: 'new-task',
        empNo: assignedEmployee.empNo,
      };
      await Notification.create(notification);
    });

    // Execute all notification promises
    await Promise.all(notificationPromises);

    return res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while creating the task' });
  }
};

/*
?@desc   Get all tasks
*@route  get /api/tasks
*@access Private/Admin
*/

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while getting the tasks' });
  }
};

/*
?@desc   Get task by Id
*@route  get /api/tasks
*@access Private
*/

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    return res.status(200).json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while getting the task details' });
  }
};

/*
?@desc   Update task board
*@route  put /api/tasks/:id
*@access Private
*/

const updateTask = async (req, res) => {
  const { boardId } = req.body;
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    const currentBoard = await Board.findOne({ tasks: task._id });
    if (currentBoard) {
      currentBoard.tasks = currentBoard.tasks.filter(
        (taskId) => taskId.toString() !== task._id.toString()
      );
      await currentBoard.save();
    }

    const newBoard = await Board.findById(boardId);
    if (!newBoard) {
      return res.status(404).json({ message: `Board with id ${boardId} not found` });
    }

    newBoard.tasks.push(task._id);
    await newBoard.save();

    task.board = {
      boardId: newBoard._id,
    };
    await task.save();

    return res.status(200).json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while updating the task' });
  }
};

/*
?@desc   Delete task
*@route  delete /api/tasks/:id
*@access Private
*/

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while deleting the task' });
  }
};

/*
?@desc   Get tasks by project
*@route  delete /api/tasks/project/:id
*@access Private
*/

const getTasksByProject = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await Task.find({ project: id });
    return res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while fetching the tasks' });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask, getTasksByProject };
