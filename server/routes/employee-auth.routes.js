const express = require('express');
const { registerEmployee, loginEmployee } = require('../controllers/employee-auth.controller');
const upload = require('../services/fileUpload');

const empAuthRouter = express.Router();

empAuthRouter
  .post(
    '/register',
    upload.fields([
      { name: 'idCardPath', maxCount: 1 },
      { name: 'bankPassPath', maxCount: 1 },
      { name: 'resumePath', maxCount: 1 },
    ]),
    registerEmployee
  )
  .post('/login', loginEmployee);

module.exports = empAuthRouter;
