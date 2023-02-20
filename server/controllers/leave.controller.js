/* eslint-disable consistent-return */
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
    const leaveRequest = await Leave.find();
    res.status(200).json(leaveRequest);
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
    } else {
      leave.status = status;
      leave.rejectedOn = new Date();
      leave.rejectedBy = req.user.id;
    }

    const updatedLeave = await leave.save();
    res.status(200).json(updatedLeave);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to approve or reject leave request' });
  }
};

module.exports = {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestById,
  approveOrRejectLeave,
};
