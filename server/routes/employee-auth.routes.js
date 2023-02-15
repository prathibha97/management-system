const express = require('express')
const { registerEmployee, loginEmployee, } = require('../controllers/employee-auth.controller')

const empAuthRouter = express.Router()

empAuthRouter
  .post('/register', registerEmployee)
  .post('/login', loginEmployee)

module.exports = empAuthRouter