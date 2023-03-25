const express = require('express');
const {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestById,
  approveOrRejectLeave,
  getLeaveRequestByIdAdmin,
} = require('../controllers/leave.controller');

const { protect, admin } = require('../middleware/auth.middleware');

const leaveRouter = express.Router();

leaveRouter.post('/', protect, createLeaveRequest).get('/', protect, admin, getAllLeaveRequests);

leaveRouter.get('/emp/:id', protect, admin, getLeaveRequestByIdAdmin);

leaveRouter.get('/:id', protect, getLeaveRequestById)

leaveRouter.put('/:empNo/approval/:id', protect, admin, approveOrRejectLeave);

module.exports = leaveRouter;
