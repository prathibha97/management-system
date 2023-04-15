const express = require('express')
const { createDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment, getEmployeesByDepartmentId } = require('../controllers/department.controller')
const { protect, admin } = require('../middleware/auth.middleware')

const departmentRouter = express.Router()

departmentRouter
  .get('/', protect, getAllDepartments)
  .post('/', protect, admin, createDepartment)

departmentRouter
  .get('/:id', protect,admin, getDepartmentById)
  .get('/:id/employees', protect, admin, getEmployeesByDepartmentId)
  .put('/:id', protect, admin, updateDepartment)
  .delete('/:id', protect, admin, deleteDepartment)

module.exports = departmentRouter