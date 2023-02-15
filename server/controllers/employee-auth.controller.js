/* eslint-disable consistent-return */
const bcrypt = require('bcrypt')
const Employee = require('../models/Employee')
const Department = require("../models/Department");
const generateToken = require('../services/generateToken');

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
    isAdmin,
    employmentHistory,
    projectHistory,
    idPath,
    bankSlipPath,
    resumePath,
    departmentId
  } = req.body;

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    const employeeExist = await Employee.findOne({ email })
    if (employeeExist) {
      return res.status(400).json({ message: "Employee already exists" })
    }
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
      isAdmin,
      employmentHistory,
      projectHistory,
      idCardPath: idPath,
      bankPassPath: bankSlipPath,
      resumePath,
      depId: departmentId
    });

    const department = await Department.findById(departmentId)
    department.employees.push(newEmployee.depId)
    await department.save()
    res.status(201).json(newEmployee)
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to register employee' });
  }
}

/* 
?@desc   Login a user
*@route  Post /api/emp/auth/login
*@access Private
*/
// TODO: Error handling

const loginEmployee = async (req, res) => {
  const { email, password } = req.body
  try {
    const employee = await Employee.findOne({ email })
    if (!employee) return res.status(404).json({ message: "User does not exists" })
    const isMatch = await bcrypt.compare(password, employee.password)
    if (!isMatch) return res.status(403).json({ message: "Invalid password" })
    employee.password = undefined
    res.status(200).json({ employee, token: generateToken(employee._id) })
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to login employee' });
  }
}

module.exports = {
  registerEmployee,
  loginEmployee
}
