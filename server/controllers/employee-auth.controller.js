/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const fs = require('fs');
const Employee = require('../models/Employee');
const Department = require('../models/Department');
const generateToken = require('../utils/generateToken');

const unlinkAsync = promisify(fs.unlink);

/* 
?@desc   Register a new user
*@route  Post /api/emp/auth/register
*@access Private/Admin
*/
// TODO: Error handling

const registerEmployee = async (req, res) => {
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
    email,
    password,
    phone,
    designation,
    isAdmin,
    employmentHistory,
    projectHistory,
    nic,
    department,
    workType,
    effectiveDate,
    dateOfAppointment,
    paymentModel,
    basicSalary,
    pf,
    bank,
    accNo,
    advance,
    maxAdvance,
    noOfAdvances,
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const employeeExist = await Employee.findOne({ email });
    if (employeeExist) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    // Upload files using the "upload" middleware
    const idCardPath = req.files?.idCardPath[0].path;
    const bankPassPath = req.files?.bankPassPath[0].path;
    const resumePath = req.files?.resumePath[0].path;

    // Create a new employee object
    const newEmployee = await Employee.create({
      empNo,
      name: { first: firstName, last: lastName },
      address: { street, city, state, zip },
      email,
      birthDate,
      gender,
      password: hashedPassword,
      phone,
      nic,
      designation,
      isAdmin,
      employmentHistory,
      projectHistory,
      idCardPath,
      bankPassPath,
      resumePath,
      department,
      workType,
      effectiveDate,
      dateOfAppointment,
      paymentModel,
      basicSalary,
      providentFund: pf,
      bank,
      accountNo: accNo,
      advance,
      maxAdvance,
      noOfAdvances,
    });

    const dept = await Department.findById(department);
    dept.employees.push(newEmployee.depId);
    await dept.save();

    res.status(201).json({ newEmployee, message: 'Employee created successfully' });
  } catch (err) {
    console.error(err.message);

    // Delete uploaded files if any
    if (req.files?.idCard) {
      await unlinkAsync(req.files?.idCardPath[0].path);
    }

    if (req.files?.bankPass) {
      await unlinkAsync(req.files?.bankPassPath[0].path);
    }

    if (req.files?.resume) {
      await unlinkAsync(req.files?.resumePath[0].path);
    }

    res.status(500).json({ message: 'Failed to register employee' });
  }
};
/* 
?@desc   Login a user
*@route  Post /api/emp/auth/login
*@access Private
*/
// TODO: Error handling

const loginEmployee = async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(404).json({ message: 'User does not exists' });
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(403).json({ message: 'Invalid password' });
    employee.password = undefined;
    res.status(200).json({ employee, token: generateToken(employee._id) });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to login employee' });
  }
};

module.exports = {
  registerEmployee,
  loginEmployee,
};
