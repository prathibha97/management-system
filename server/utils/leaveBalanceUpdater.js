/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const Employee = require('../models/Employee');
const calculateBroughtForwardLeaves = require('./calculateBroughtForwardLeaves');

const updateLeaveBalances = async () => {
  try {
    // Get all employees
    const employees = await Employee.find();

    // Iterate through each employee and update their leave balances
    for (const employee of employees) {
      const broughtForwardLeaves = await calculateBroughtForwardLeaves(employee);
      employee.leaveBalance.BroughtForward = broughtForwardLeaves;
      await employee.save();
    }

    console.log('Leave balances updated successfully.');
  } catch (err) {
    console.error('Failed to update leave balances:', err.message);
  }
};

module.exports = updateLeaveBalances;
