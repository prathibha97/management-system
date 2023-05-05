const express = require('express');
const attendanceRouter = require('./attendance.routes');
const boardRouter = require('./board.routes');
const departmentRouter = require('./department.routes');
const designationRouter = require('./designation.routes');
const empAuthRouter = require('./employee-auth.routes');
const empRouter = require('./employee.routes');
const experienceRouter = require('./experience.routes');
const googleMeetingRouter = require('./googleMeeting.routes');
const leaveRouter = require('./leave.routes');
const meetingsRouter = require('./meetings.routes');
const projectRouter = require('./project.routes');
const taskRouter = require('./task.routes');
const notificationRouter = require('./notification.routes');
const clientRouter = require('./client.routes');

const api = express.Router();

api.use('/emp', empRouter);
api.use('/emp/auth', empAuthRouter);
api.use('/departments', departmentRouter);
api.use('/attendance', attendanceRouter);
api.use('/leaves', leaveRouter);
api.use('/projects', projectRouter);
api.use('/clients', clientRouter);
api.use('/tasks', taskRouter);
api.use('/boards', boardRouter);
api.use('/meetings', meetingsRouter);
api.use('/google', googleMeetingRouter);
api.use('/designations', designationRouter);
api.use('/experiences', experienceRouter);
api.use('/notifications', notificationRouter);

module.exports = api;
