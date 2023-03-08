const express = require('express');
const { getAllBoards, getBoardsByProjectId } = require('../controllers/board.controller');

const { protect, admin } = require('../middleware/auth.middleware');

const boardRouter = express.Router();

boardRouter.get('/', protect, admin, getAllBoards);

boardRouter.get('/project/:projectId', protect, getBoardsByProjectId);

module.exports = boardRouter;
