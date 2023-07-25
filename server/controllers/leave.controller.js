/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */

const io = require('socket.io')();
const http = require('http');
const Leave = require('../models/Leave');
const Employee = require('../models/Employee');
const getNumberOfDays = require('../utils/getNumberOfDays');
const Notification = require('../models/Notification');
const formatDate = require('../utils/formatDate');
const upload = require('../services/fileUpload');
const sendEmail = require('../services/sendEmail');
const leaveRequestTemplate = require('../email/leaveRequestTemplate');
const app = require('../app');

/* 
?@desc   Create a new leave request
*@route  Post /api/leaves/
*@access Private
*/

const createLeaveRequest = async (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body;
  const { empNo } = req.user;
  const medical = req.files?.medical?.[0]?.path ?? '';

  // Upload files using the "upload" middleware
  await upload.any()(req, res, () => {});

  try {
    // Check if employee with the given empNo exists
    const employee = await Employee.findOne({ empNo });
    if (!employee) {
      return res.status(404).json({ message: 'You are not authorized to create a leave request' });
    }

    // Create a new leave request object
    const leaveRequest = await Leave.create({
      employee: employee._id,
      empNo,
      leaveType,
      startDate,
      endDate,
      reason,
      medical,
    });

    // Notify HR about leave request
    const email = 'prsthibha@gmail.com';
    const subject = 'SPHIRIA DIGITAL SYSTEM LEAVE REQUEST';
    const employeeName = `${req.user.name.first} ${req.user.name.last}`;
    const body = leaveRequestTemplate(employeeName, leaveType, startDate, endDate, reason);
    sendEmail({ email, subject, body })
      .then(() => {
        res.status(201).json({ message: 'Leave request created successfully', leaveRequest });
      })
      .catch((error) => {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to send email notification' });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to create leave request' });
  }
};

/* 
?@desc   Get all leave requests
*@route  Get /api/leaves/
*@access Private/Admin
*/

const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await Leave.find().populate('employee', 'name');
    res.status(200).json(leaveRequests);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to fetch leave request' });
  }
};

/* 
?@desc   Get all leave requests of a specific employee
*@route  Get /api/leaves/:id
*@access Private
*/

const getLeaveRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const leaveRequest = await Leave.find({ empNo: id });
    res.status(200).json(leaveRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to fetch leave request' });
  }
};

/* 
?@desc   Approve or reject a leave request
*@route  Get /api/leaves/:id/approval
*@access Private
*/

const approveOrRejectLeave = async (req, res) => {
  const { empNo, id } = req.params;
  const { status } = req.body;

  try {
    const leave = await Leave.findById(id).where('empNo').equals(empNo);
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    if (leave.status !== 'Pending') {
      return res.status(400).json({ message: 'Leave request is already processed' });
    }

    if (status === 'Approved') {
      const { leaveType, startDate, endDate } = leave;
      const numberOfDays = getNumberOfDays(startDate, endDate);
      const employee = await Employee.findOne({ empNo });
      const leaveBalance = employee.leaveBalance[leaveType];

      if (leaveBalance < numberOfDays) {
        return res.status(400).json({ message: 'Insufficient leave balance' });
      }

      employee.leaveBalance[leaveType] -= numberOfDays;
      await employee.save();

      leave.status = status;
      leave.approvedOn = new Date();
      leave.approvedBy = req.user.id;

      // Notify employee about leave approval
      const message = `Your leave request has been approved for ${numberOfDays} days from ${formatDate(
        startDate
      )} to ${formatDate(endDate)}.`;
      const payload = { message };
      const channel = `private-${empNo}`;
      io.to(channel).emit('newNotification', payload);

      // Persist the notification
      const notification = {
        message,
        type: 'leave-approved',
        empNo,
      };
      await Notification.create(notification);
    } else {
      const { reason } = req.body;
      leave.status = status;
      leave.rejectedOn = new Date();
      leave.rejectedBy = req.user.id;
      leave.rejectionReason = reason;

      // Notify employee about leave rejection
      const message = `Your leave request has been rejected due to ${reason}.`;
      const payload = { message };
      const channel = `private-${empNo}`;
      io.to(channel).emit('newNotification', payload);

      // Persist the notification
      const notification = {
        message,
        type: 'leave-rejected',
        empNo,
      };
      await Notification.create(notification);
    }

    const updatedLeave = await leave.save();
    res.status(200).json({ updatedLeave, message: 'Leave request updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to approve or reject leave request' });
  }
};

const server = http.createServer(app);
io.attach(server);

io.on('connection', (socket) => {
  const { empNo } = socket.handshake.query;
  const channel = `private-${empNo}`;
  socket.join(channel);

  socket.on('disconnect', () => {
    socket.leave(channel);
  });
});

/* 
?@desc   Get all approved leave requests of a specific employee
*@route  Get /api/leaves/:id
*@access Private/Admin
*/

const getLeaveRequestByIdAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const leaveRequest = await Leave.find({ empNo: id, status: 'Approved' }).populate(
      'approvedBy',
      'name'
    );
    res.status(200).json(leaveRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to fetch leave request' });
  }
};

/* 
?@desc   Delete leave request
*@route  DELETE /api/leaves/:id
*@access Private/Admin
*/

const deleteLeaveRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const leaveRequest = await Leave.findById(id);
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    await leaveRequest.remove();
    res.status(200).json({ message: 'Leave request deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete leave request' });
  }
};

/* 
?@desc   Allocate duty and nopay leaves
*@route  POST /api/leaves/allocate-admin-leaves
*@access Private/Admin
*/

async function allocateAdminLeaves(req, res) {
  try {
    const { empNo, leaveType, leaveDays } = req.body;

    // Check if the logged-in admin has the necessary permissions
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ error: 'You are not authorized to perform this action.' });
    }

    // Find the employee by their empNo
    const employee = await Employee.findOne({ empNo });

    // If the employee does not exist, return an error
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    // Update the employee's leave balance based on the leave type
    if (leaveType === 'Duty') {
      employee.leaveBalance.Duty += leaveDays;
    } else if (leaveType === 'NoPay') {
      employee.leaveBalance.NoPay += leaveDays;
    }

    // Save the updated employee record
    await employee.save();

    return res.status(200).json({ message: 'Leave allocated successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestById,
  approveOrRejectLeave,
  getLeaveRequestByIdAdmin,
  deleteLeaveRequest,
  allocateAdminLeaves,
};
