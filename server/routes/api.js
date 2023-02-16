const express = require('express')
const attendanceRouter = require('./attendance.routes')
const departmentRouter = require('./department.routes')
const empAuthRouter = require('./employee-auth.routes')
const empRouter = require('./employee.routes')

const api = express.Router()

api.use('/emp', empRouter)
api.use('/emp/auth', empAuthRouter)
api.use('/departments', departmentRouter)
api.use('/attendance', attendanceRouter)

module.exports = api