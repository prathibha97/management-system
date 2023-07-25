const express = require('express')
const { getAllEmployees, getEmployeeById, updateEmployee, removeEmployee, getEmployeeProfile, updateEmployeeProfile } = require('../controllers/employee.controller')
const { admin, protect } = require('../middleware/auth.middleware')
const upload = require('../services/fileUpload')

const empRouter = express.Router()

empRouter
  .get('/', protect, admin, getAllEmployees)

empRouter
  .get('/:id', protect, admin, getEmployeeById)
  .put(
    '/:id',
    protect,
    admin,
    upload.fields([
      { name: 'idCardPath', maxCount: 1 },
      { name: 'bankPassPath', maxCount: 1 },
      { name: 'resumePath', maxCount: 1 },
    ]),
    updateEmployee
  )
  .delete('/:id', protect, admin, removeEmployee);

empRouter
  .get('/profile/:id', protect, getEmployeeProfile)
  .put('/profile/:id', protect, updateEmployeeProfile)

module.exports = empRouter