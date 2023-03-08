const express = require('express');
const attendanceRouter = require('./attendance.routes');
const boardRouter = require('./board.routes');
const departmentRouter = require('./department.routes');
const empAuthRouter = require('./employee-auth.routes');
const empRouter = require('./employee.routes');
const leaveRouter = require('./leave.routes');
const projectRouter = require('./project.routes');
// const pusherRouter = require('./pusher.routes');
const taskRouter = require('./task.routes');

const api = express.Router();

api.use('/emp', empRouter);
api.use('/emp/auth', empAuthRouter);
api.use('/departments', departmentRouter);
api.use('/attendance', attendanceRouter);
api.use('/leaves', leaveRouter);
api.use('/projects', projectRouter);
api.use('/tasks', taskRouter);
api.use('/boards', boardRouter);
// api.use('/pusher', pusherRouter);

module.exports = api;
