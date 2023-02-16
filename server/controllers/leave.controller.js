/* eslint-disable consistent-return */
const Leave = require('../models/Leave')
const Employee = require('../models/Employee')

/* 
?@desc   Create a new leave request
*@route  Post /api/leave/
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
      reason
    });

    res.status(201).json({ message: 'Leave request created successfully', leaveRequest });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to create leave request' });
  }
};

module.exports = {
  createLeaveRequest
}