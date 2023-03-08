/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
const io = require('socket.io')(5001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
const Leave = require('../models/Leave');
const Employee = require('../models/Employee');
const getNumberOfDays = require('../utils/getNumberOfDays');

/* 
?@desc   Create a new leave request
*@route  Post /api/leaves/
*@access Private
*/

const createLeaveRequest = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    const { empNo } = req.user;

    // Check if employee with the given empNo exists
    const employee = await Employee.findOne({ empNo });
    if (empNo !== employee.empNo) {
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
    });

    res.status(201).json({ message: 'Leave request created successfully', leaveRequest });
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
      const message = `Your leave request has been approved for ${numberOfDays} days from ${startDate} to ${endDate}.`;
      const payload = { message };
      const channel = `private-${empNo}`;
      io.to(channel).emit('leave-approved', payload);
    } else {
      leave.status = status;
      leave.rejectedOn = new Date();
      leave.rejectedBy = req.user.id;

      // Notify employee about leave rejection
      const message = `Your leave request has been rejected.`;
      const payload = { message };
      const channel = `private-${empNo}`;
      io.to(channel).emit('leave-rejected', payload);
    }

    const updatedLeave = await leave.save();
    res.status(200).json({ updatedLeave, message: 'Leave request updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to approve or reject leave request' });
  }
};

io.on('connection', (socket) => {
  const { empNo } = socket.handshake.query;
  const channel = `private-${empNo}`;
  socket.join(channel);

  socket.on('disconnect', () => {
    socket.leave(channel);
  });
});

// const approveOrRejectLeave = async (req, res) => {
//   const { empNo, id } = req.params;
//   const { status } = req.body;
//   try {
//     const leave = await Leave.findById(id).where('empNo').equals(empNo);
//     if (!leave) {
//       return res.status(404).json({ message: 'Leave not found' });
//     }
//     if (leave.status !== 'Pending') {
//       return res.status(400).json({ message: 'Leave request is already processed' });
//     }

//     if (status === 'Approved') {
//       const { leaveType, startDate, endDate } = leave;
//       const numberOfDays = getNumberOfDays(startDate, endDate);
//       const employee = await Employee.findOne({ empNo });
//       const leaveBalance = employee.leaveBalance[leaveType];
//       if (leaveBalance < numberOfDays) {
//         return res.status(400).json({ message: 'Insufficient leave balance' });
//       }

//       employee.leaveBalance[leaveType] -= numberOfDays;
//       await employee.save();

//       leave.status = status;
//       leave.approvedOn = new Date();
//       leave.approvedBy = req.user.id;

//       // Notify employee
//       const notification = new Notification({
//         message: `Your leave request from ${startDate} to ${endDate} has been approved.`,
//         receiver: empNo,
//         type: 'Leave Approval',
//       });
//       await notification.save();
//       const socketId = await getSocketIdByUserId(empNo);
//       if (socketId) {
//         io.to(socketId).emit('notification', notification);
//         console.log(notification);
//       }
//     } else {
//       leave.status = status;
//       leave.rejectedOn = new Date();
//       leave.rejectedBy = req.user.id;

//       // Notify employee
//       const notification = new Notification({
//         message: `Your leave request from ${leave.startDate} to ${leave.endDate} has been rejected.`,
//         receiver: empNo,
//         type: 'Leave Rejection',
//       });
//       await notification.save();
//       const socketId = await getSocketIdByUserId(empNo);
//       if (socketId) {
//         io.to(socketId).emit('notification', notification);
//         console.log(notification);
//       }
//     }

//     const updatedLeave = await leave.save();
//     res.status(200).json(updatedLeave);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Failed to approve or reject leave request' });
//   }
// };

module.exports = {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestById,
  approveOrRejectLeave,
};
