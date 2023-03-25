const express = require('express');
const { createDesignation, getAllDesignations } = require('../controllers/designation.controller');

const { protect, admin } = require('../middleware/auth.middleware');

const designationRouter = express.Router();

designationRouter
  .post('/', protect, admin, createDesignation)
  .get('/', protect, admin, getAllDesignations);

module.exports = designationRouter;
