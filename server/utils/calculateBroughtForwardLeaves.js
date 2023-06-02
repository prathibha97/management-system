const calculateBroughtForwardLeaves = async (employee) => {
  let broughtForwardLeaves = 0;

  if (
    employee.workType !== 'Intern' &&
    employee.workType !== 'Contract' &&
    employee.workType !== 'Part-Time'
  ) {
    const annualLeaves = employee.leaveBalance.Annual;
    const maximumBroughtForwardLeaves = 4;

    broughtForwardLeaves = Math.min(annualLeaves, maximumBroughtForwardLeaves);
  }

  return broughtForwardLeaves;
};

module.exports = calculateBroughtForwardLeaves;
