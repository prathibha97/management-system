const express = require('express');
const { createTask, updateTask } = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');

const taskRouter = express.Router();

taskRouter.post('/', protect, createTask);
taskRouter.put('/:id', protect, updateTask);

module.exports = taskRouter;
