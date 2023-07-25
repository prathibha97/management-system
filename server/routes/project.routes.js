const express = require('express');
const {
  createProject,
  getProjectById,
  getAllProjects,
  getProjectByEmpId,
  deleteProject,
  editProject,
} = require('../controllers/project.controller');

const { protect, admin } = require('../middleware/auth.middleware');
const upload = require('../services/fileUpload');

const projectRouter = express.Router();

projectRouter
  .post('/', protect, admin, upload.fields([{ name: 'projectScope', maxCount: 1 }]), createProject)
  .get('/', protect, admin, getAllProjects);

projectRouter.get('/emp', protect, getProjectByEmpId);
projectRouter
  .get('/:id', protect, getProjectById)
  .delete('/:id', protect, admin, deleteProject)
  .put('/:id', protect, admin, upload.fields([{ name: 'projectScope', maxCount: 1 }]), editProject);

module.exports = projectRouter;
