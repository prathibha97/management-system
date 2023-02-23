const Board = require('../models/Board');
const Project = require('../models/Project');
const Task = require('../models/Task');

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

    return res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while creating the task' });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while getting the tasks' });
  }
};

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

// const updateTask = async (req, res) => {
//   const { boardId, status } = req.body;
//   const { id } = req.params;

//   try {
//     const task = await Task.findById(id);

//     const board = await Board.findById(boardId);
//     if (!board) {
//       return res.status(404).json({ message: `Board with id ${boardId} not found` });
//     }

//     const taskIndex = board.tasks.findIndex((taskId) => taskId.toString() === task._id.toString());
//     if (taskIndex === -1) {
//       board.tasks.push(task._id);
//     }
//     board.status = status || board.status;
//     await board.save();

//     task.board = {
//       boardId: board._id,
//       status: board.status,
//     };
//     await task.save();

//     return res.status(200).json(task);
//   } catch (err) {
//     return res.status(500).json({ message: 'Error occurred while updating the task' });
//   }
// };

// const updateTask = async (req, res) => {
//   const { boardId } = req.body;
//   const { id } = req.params;

//   try {
//     const task = await Task.findById(id);

//     const board = await Board.findById(boardId);
//     if (!board) {
//       return res.status(404).json({ message: `Board with id ${boardId} not found` });
//     }

//     // Check if the board has the 'tasks' property before accessing it
//     if (!board.tasks) {
//       board.tasks = [];
//     }

//     const taskIndex = board.tasks.findIndex((taskId) => taskId.toString() === task._id.toString());
//     if (taskIndex === -1) {
//       board.tasks.push(task._id);
//     }

//     task.board = {
//       boardId: board._id,
//     };
//     await task.save();

//     return res.status(200).json(task);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: 'Error occurred while updating the task' });
//   }
// };

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


module.exports = { createTask, getTasks, getTaskById, updateTask };
