const express = require('express');
const {
  createProject,
  getProjectById,
  getAllProjects,
  getProjectByEmpId,
} = require('../controllers/project.controller');

const { protect, admin } = require('../middleware/auth.middleware');

const projectRouter = express.Router();

projectRouter.post('/', protect, admin, createProject).get('/', protect, admin, getAllProjects);

projectRouter.get('/emp', protect, getProjectByEmpId);
projectRouter.get('/:id', protect, getProjectById);

module.exports = projectRouter;
