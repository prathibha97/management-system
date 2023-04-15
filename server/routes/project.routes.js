const express = require('express');
const {
  createProject,
  getProjectById,
  getAllProjects,
  getProjectByEmpId,
  deleteProject,
} = require('../controllers/project.controller');

const { protect, admin } = require('../middleware/auth.middleware');

const projectRouter = express.Router();

projectRouter.post('/', protect, admin, createProject).get('/', protect, admin, getAllProjects);

projectRouter.get('/emp', protect, getProjectByEmpId);
projectRouter.get('/:id', protect, getProjectById).delete('/:id', protect, admin, deleteProject);

module.exports = projectRouter;
