/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
// const Employee = require('../models/Employee');
// const calculateBroughtForwardLeaves = require('./calculateBroughtForwardLeaves');

// const updateLeaveBalances = async () => {
//   try {
//     // Get all employees
//     const employees = await Employee.find();

//     // Iterate through each employee and update their leave balances
//     for (const employee of employees) {
//       const broughtForwardLeaves = await calculateBroughtForwardLeaves(employee);
//       employee.leaveBalance.BroughtForward = broughtForwardLeaves;
//       await employee.save();
//     }

//     console.log('Leave balances updated successfully.');
//   } catch (err) {
//     console.error('Failed to update leave balances:', err.message);
//   }
// };

// module.exports = updateLeaveBalances;

const Employee = require('../models/Employee');
const calculateBroughtForwardLeaves = require('./calculateBroughtForwardLeaves');

const updateLeaveBalances = async () => {
  try {
    // Get all employees
    const employees = await Employee.find();

    // Iterate through each employee and update their leave balances
    for (const employee of employees) {
      // Update the brought forward leaves
      const broughtForwardLeaves = await calculateBroughtForwardLeaves(employee);
      employee.leaveBalance.BroughtForward = broughtForwardLeaves;

      // Reset other leave balances to default values at the start of every new year
      const currentYear = new Date().getFullYear().toString();

      const getDefaultCasualLeaveBalance = (workType) => {
        if (['Intern', 'Contract', 'Part-Time'].includes(workType)) {
          return 2;
        }
        return 7;
      };

      const getDefaultAnnualLeaveBalance = (workType) => {
        if (['Intern', 'Contract', 'Part-Time'].includes(workType)) {
          return 0;
        }
        return 7;
      };

      const getDefaultMaternityLeaveBalance = (gender) => {
        if (gender === 'Female') {
          return 7;
        }
        return 0;
      };

      const getDefaultMedicalLeaveBalance = (workType) => {
        if (['Intern', 'Contract', 'Part-Time'].includes(workType)) {
          return 1;
        }
        return 7;
      };
      
      if (employee.effectiveDate.startsWith(currentYear)) {
        employee.leaveBalance.Casual = getDefaultCasualLeaveBalance(employee.workType);
        employee.leaveBalance.Annual = getDefaultAnnualLeaveBalance(employee.workType);
        employee.leaveBalance.Maternity = getDefaultMaternityLeaveBalance(employee.gender);
        employee.leaveBalance.Medical = getDefaultMedicalLeaveBalance(employee.workType);
      }

      await employee.save();
    }

    console.log('Leave balances updated successfully.');
  } catch (err) {
    console.error('Failed to update leave balances:', err.message);
  }
};

module.exports = updateLeaveBalances;
