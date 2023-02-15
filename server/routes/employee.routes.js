const express = require('express')
const { getAllEmployees, getEmployeeById, updateEmployee, removeEmployee, getEmployeeProfile, updateEmployeeProfile } = require('../controllers/employee.controller')
const { admin, protect } = require('../middleware/auth.middleware')

const empRouter = express.Router()

empRouter
  .get('/', protect, admin, getAllEmployees)

empRouter
  .get('/:id', protect, admin, getEmployeeById)
  .put('/:id', protect, admin, updateEmployee)
  .delete('/:id', protect, admin, removeEmployee)

empRouter
  .get('/profile', protect, getEmployeeProfile)
  .put('/profile', protect, updateEmployeeProfile)

module.exports = empRouter