const express = require('express');
const {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestById,
  approveOrRejectLeave,
  getLeaveRequestByIdAdmin,
  deleteLeaveRequest,
} = require('../controllers/leave.controller');

const { protect, admin } = require('../middleware/auth.middleware');
const upload = require('../services/fileUpload');

const leaveRouter = express.Router();

leaveRouter.post('/', protect, upload.fields([{ name: 'medical', maxCount: 1 }]), createLeaveRequest).get('/', protect, admin, getAllLeaveRequests);

leaveRouter.get('/emp/:id', protect, admin, getLeaveRequestByIdAdmin);

leaveRouter.get('/:id', protect, getLeaveRequestById);

leaveRouter.delete('/:id', protect, admin, deleteLeaveRequest);

leaveRouter.put('/:empNo/approval/:id', protect, admin, approveOrRejectLeave);

module.exports = leaveRouter;
