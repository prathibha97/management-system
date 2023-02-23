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

const updateTask = async (req, res) => {
  const { boardId, status } = req.body;
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    const boardIndex = task.board.findIndex((board) => board.boardId.toString() === boardId);
    if (boardIndex === -1) {
      return res.status(404).json({ message: `Board with id ${boardId} not found in task` });
    }
    task.board[boardIndex].status = status || task.board[boardIndex].status;
    await task.save();
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ message: 'Error occurred while updating the task' });
  }
};



module.exports = { createTask, updateTask };
