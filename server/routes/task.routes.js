const express = require('express');
const { createTask, updateTask, getTaskById, getTasks } = require('../controllers/task.controller');
const { protect, admin } = require('../middleware/auth.middleware');

const taskRouter = express.Router();

taskRouter.get('/', protect, admin, getTasks).post('/', protect, createTask);
taskRouter.get('/:id', protect, getTaskById).put('/:id', protect, updateTask);

module.exports = taskRouter;
