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
    await Board.findByIdAndUpdate(
      boardId,
      { $push: { tasks: task._id } },
      { new: true }
    ).populate('tasks');

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

module.exports = { createTask };
