const express = require('express');
const {
  registerEmployee,
  loginEmployee,
  resetPassword,
  refreshAuthToken,
  logoutEmployee,
} = require('../controllers/employee-auth.controller');
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
  .post('/login', loginEmployee)
  .post('/reset-password', resetPassword)
  .get('/refresh', refreshAuthToken)
  .post('/logout', logoutEmployee);

module.exports = empAuthRouter;
