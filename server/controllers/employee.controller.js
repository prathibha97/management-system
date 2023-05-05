/* eslint-disable consistent-return */
// getUserProfile   private,
// updateUserProfile private,

const Employee = require('../models/Employee');

/*
?@desc   Get all employees
*@route  Get /api/emp/
*@access Private/Admin
*/

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({})
      .populate('department', 'name')
      .populate('designation')
      .select('-password');
    res.status(200).json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to get employee list' });
  }
};

/*
?@desc   Get employee by id
*@route  Get /api/emp/:id
*@access Private/Admin
*/

const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findOne({ empNo: id })
      .populate('designation')
      .populate('projectHistory.project')
      .populate('department')
      .select('-password');
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to get employee details' });
  }
};

/*
?@desc   Update employee details
*@route  Put /api/emp/:id
*@access Private/Admin
*/

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const {
    empNo,
    firstName,
    lastName,
    street,
    city,
    state,
    zip,
    birthDate,
    gender,
    designation,
    email,
    phone,
    isAdmin,
    employmentHistory,
    projectHistory,
    idPath,
    bankSlipPath,
    resumePath,
    department,
  } = req.body;

  try {
    const employee = await Employee.findOne({ empNo: id });
    if (employee) {
      employee.empNo = empNo || employee.empNo;
      employee.name.first = firstName || employee.name.first;
      employee.name.last = lastName || employee.name.last;
      employee.address.street = street || employee.address.street;
      employee.address.city = city || employee.address.city;
      employee.address.state = state || employee.address.state;
      employee.address.zip = zip || employee.address.zip;
      employee.birthDate = birthDate || employee.birthDate;
      employee.gender = gender || employee.gender;
      employee.email = email || employee.email;
      employee.designation = designation || employee.designation;
      employee.phone = phone || employee.phone;
      employee.isAdmin = isAdmin;
      employee.employmentHistory = employmentHistory || employee.employmentHistory;
      employee.projectHistory = projectHistory || employee.projectHistory;
      employee.idPath = idPath || employee.idPath;
      employee.bankSlipPath = bankSlipPath || employee.bankSlipPath;
      employee.resumePath = resumePath || employee.resumePath;
      employee.department = department || employee.department;
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }

    const updatedEmployee = await employee.save();

    res.status(200).json(updatedEmployee);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to update employee details' });
  }
};

/*
?@desc   Remove employee
*@route  Delete /api/emp/:id
*@access Private/Admin
*/

const removeEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findOneAndDelete({ empNo: id });
    res.status(200).json({ message: 'Employee removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to remove employee' });
  }
};

/*
?@desc   Get employee profile
*@route  Get /api/emp/profile
*@access Private
*/

const getEmployeeProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findOne({ empNo: id })
      .select('-password')
      .populate('department', 'name description')
      .populate('designation', 'name')
      .populate('employmentHistory');
    if (employee) {
      // *Check if the logged-in user is the same as the employee being viewed
      if (req.empNo !== employee.empNo) {
        return res
          .status(403)
          .json({ message: 'You are not authorized to view this employee profile' });
      }
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to get employee details' });
  }
};

/*
?@desc   Get employee profile
*@route  Get /api/emp/profile
*@access Private
*/

const updateEmployeeProfile = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    password,
    street,
    city,
    state,
    zip,
    birthDate,
    gender,
    phone,
    employmentHistory,
  } = req.body;

  try {
    const employee = await Employee.findOne({ empNo: id });
    if (employee) {
      // *Check if the logged-in user is the same as the employee being updated
      if (req.empNo !== employee.empNo) {
        return res
          .status(403)
          .json({ message: 'You are not authorized to update this employee profile' });
      }
      employee.name.first = firstName || employee.name.first;
      employee.name.last = lastName || employee.name.last;
      if (password) employee.password = password;
      employee.address.street = street || employee.address.street;
      employee.address.city = city || employee.address.city;
      employee.address.state = state || employee.address.state;
      employee.address.zip = zip || employee.address.zip;
      employee.birthDate = birthDate || employee.birthDate;
      employee.gender = gender || employee.gender;
      employee.phone = phone || employee.phone;
      employee.employmentHistory = employmentHistory || employee.employmentHistory;
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }

    const updatedEmployee = await employee.save();
    employee.password = undefined;
    res.status(200).json(updatedEmployee);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to update employee details' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  removeEmployee,
  getEmployeeProfile,
  updateEmployeeProfile,
};
