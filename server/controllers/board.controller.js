const Board = require('../models/Board');

/*
?@desc   Get all boards
*@route  Get /api/boards
*@access Private
*/

const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find().populate('project');
    res.status(200).json(boards);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to get boards details' });
  }
};

/*
?@desc   Get boards by project
*@route  Get /api/boards/project/:projectId
*@access Private
*/

const getBoardsByProjectId = async (req, res) => {
  const { projectId } = req.params;
  try {
    const boards = await Board.find({ project: projectId }).populate({
      path: 'tasks',
      options: { distinct: true },
      populate: {
        path: 'assignee',
        select: 'name',
      },
    });

    res.status(200).json(boards);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to get boards details' });
  }
};

module.exports = {
  getAllBoards,
  getBoardsByProjectId,
};
