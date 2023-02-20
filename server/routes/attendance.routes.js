const express = require('express')
const { markAttendance, getAttendanceById, getAllAttendance } = require('../controllers/attendance.controller')

const { protect, admin } = require('../middleware/auth.middleware')

const attendanceRouter = express.Router()

attendanceRouter
  .get('/', protect, markAttendance)
  .get('/all', protect, admin, getAllAttendance)

attendanceRouter
  .get('/:id', protect, getAttendanceById)

module.exports = attendanceRouter