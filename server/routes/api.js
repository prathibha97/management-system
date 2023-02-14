const express = require('express')
const departmentRouter = require('./department.routes')
const empAuthRouter = require('./employee-auth.routes')
const empRouter = require('./employee.routes')

const api = express.Router()

api.use('/emp', empRouter)
api.use('/emp/auth', empAuthRouter)
api.use('/departments', departmentRouter)

module.exports = api