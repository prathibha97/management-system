const express = require('express')
const { markAttendance, getAllAttendance, getAttendanceById } = require('../controllers/attendance.controller')

const { protect, admin } = require('../middleware/auth.middleware')

const attendanceRouter = express.Router()

attendanceRouter
  .post('/', protect, markAttendance)
  .get('/', protect, admin, getAllAttendance)

attendanceRouter
  .get('/:id', protect, getAttendanceById)

module.exports = attendanceRouter