const express = require('express');
const { createTask } = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');

const taskRouter = express.Router();

taskRouter.post('/', protect, createTask);

module.exports = taskRouter;
