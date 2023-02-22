const express = require('express');
const { createProject, getProjectById } = require('../controllers/project.controller');

const { protect, admin } = require('../middleware/auth.middleware');

const projectRouter = express.Router();

projectRouter.post('/', protect, admin, createProject).get('/', protect, admin);

projectRouter.get('/:id', protect, getProjectById);

module.exports = projectRouter;
