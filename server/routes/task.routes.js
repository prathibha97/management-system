const express = require('express');
const {
  createTask,
  updateTask,
  getTaskById,
  getTasks,
  deleteTask,
} = require('../controllers/task.controller');
const { protect, admin } = require('../middleware/auth.middleware');

const taskRouter = express.Router();

taskRouter.get('/', protect, admin, getTasks).post('/', protect, createTask);
taskRouter
  .get('/:id', protect, getTaskById)
  .put('/:id', protect, updateTask)
  .delete('/:id', protect, deleteTask);

module.exports = taskRouter;
