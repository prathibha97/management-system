const express = require('express');
const {
  addExperience,
  getAllExperience,
  getExperienceById,
  removeExperience,
} = require('../controllers/experience.controller');

const { protect, admin } = require('../middleware/auth.middleware');

const experienceRouter = express.Router();

experienceRouter.get('/', protect, admin, getAllExperience).post('/', protect, addExperience);

experienceRouter
  .get('/:id', protect, getExperienceById)
  .put('/:id', protect, removeExperience)
  .delete('/:id', protect, removeExperience);

module.exports = experienceRouter;
