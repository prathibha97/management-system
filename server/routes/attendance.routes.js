const express = require('express');
const {
  markAttendance,
  getAttendanceById,
  getAllAttendance,
  getAttendanceByIdAdmin,
} = require('../controllers/attendance.controller');

const { protect, admin } = require('../middleware/auth.middleware');

const attendanceRouter = express.Router();

attendanceRouter
  .get('/', protect, markAttendance)
  .get('/all', protect, admin, getAllAttendance)
  .get('/emp/:id', protect, admin, getAttendanceByIdAdmin);
attendanceRouter.get('/:id', protect, getAttendanceById);

module.exports = attendanceRouter;
