const express = require('express')
const { createDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment } = require('../controllers/department.controller')

const departmentRouter = express.Router()

departmentRouter
  .get('/', getAllDepartments)
  .post('/', createDepartment)

departmentRouter
  .get('/:id', getDepartmentById)
  .put('/:id', updateDepartment)
  .delete('/:id', deleteDepartment)

module.exports = departmentRouter