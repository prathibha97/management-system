/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const Department = require('../models/Department');
const generateToken = require('../utils/generateToken');
const upload = require('../services/fileUpload');

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
    bank,
    accNo,
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const employeeExist = await Employee.findOne({ email });
    if (employeeExist) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    // Upload files using the "upload" middleware
    await upload.any()(req, res, () => {});

    // // Upload files using the "upload" middleware
    const idCardPath = req.files?.idCardPath?.[0]?.path ?? '';
    const bankPassPath = req.files?.bankPassPath?.[0]?.path ?? '';
    const resumePath = req.files?.resumePath?.[0]?.path ?? '';

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
      bank,
      accountNo: accNo,
    });

    // console.log(req.files?.idCardPath[0].path);
    // console.log(req.files?.bankPassPath[0].path);
    // console.log(req.files?.resumePath[0].path);

    const dept = await Department.findById(department);
    dept.employees.push(newEmployee._id);
    await dept.save();

    res.status(201).json({ newEmployee, message: 'Employee created successfully' });
  } catch (err) {
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
    console.error(err.message);
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
  const { cookies } = req;
  try {
    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(404).json({ message: 'Employee does not exists' });
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(403).json({ message: 'Invalid password' });

    const accessToken = generateToken(employee._id, '1d');
    const newRefreshToken = generateToken(employee._id, '1d');

    // Changed to let keyword
    let newRefreshTokenArray = !cookies?.jwt
      ? employee.refreshToken
      : employee.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await Employee.findOne({ refreshToken }).exec();

      // Detected refresh token reuse!
      if (!foundToken) {
        // clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
    }

    // Saving refreshToken with current user
    employee.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await employee.save();

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    employee.password = undefined;
    // Send authorization roles and access token to user
    res.status(200).json({ employee, token: accessToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to login employee' });
  }
};

/* 
?@desc   Logout a user
*@route  Post /api/emp/auth/login
*@access Private
*/

// const logoutEmployee = async (req, res) => {
//   // On client, also delete the accessToken

//   const { cookies } = req;
//   if (!cookies?.jwt) return res.sendStatus(204);
//   const refreshToken = cookies.jwt;

//   // Is refreshToken in db?
//   const foundUser = await Employee.findOne({ refreshToken }).exec();
//   if (!foundUser) {
//     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
//     return res.sendStatus(204);
//   }

//   // Delete refreshToken in db
// await Employee.findOneAndUpdate(
//     { _id: foundUser._id },
//     { $pull: { refreshToken } },
//     { new: true }
//   ).exec();

//   res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
//   res.sendStatus(204);
// };

const logoutEmployee = async (req, res) => {
  const { cookies } = req;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  const foundUser = await Employee.findOne({ refreshToken });

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = foundUser.refreshToken.filter((rt) => rt !== refreshToken);
  await foundUser.save();

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.sendStatus(204);
};

/* 
?@desc   Reset password
*@route  Post /api/emp/auth/reset-password
*@access Private
*/

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(404).json({ message: 'User does not exists' });

    // generate salt and hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // update user's password in database
    employee.password = hashedPassword;
    await employee.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error occured while reseting the password' });
  }
};

/* 
?@desc   Refresh token
*@route  Post /api/emp/auth/refresh
*@access Private
*/

const refreshAuthToken = async (req, res) => {
  const { cookies } = req;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

  const foundUser = await Employee.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.sendStatus(403);
      // Delete refresh tokens of hacked user
      const hackedUser = await Employee.findOne({
        empNo: decoded.empNo,
      }).exec();
      hackedUser.refreshToken = [];
      await hackedUser.save();
    });
    return res.sendStatus(403);
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter((rt) => rt !== refreshToken);

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      // expired refresh token
      foundUser.refreshToken = [...newRefreshTokenArray];
      await foundUser.save();
    }
    if (err || foundUser.empNo !== decoded.empNo) return res.sendStatus(403);

    const accessToken = generateToken(decoded.empNo, '1d');
    const newRefreshToken = generateToken(decoded.empNo, '1d');
    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  });
};

module.exports = {
  registerEmployee,
  loginEmployee,
  logoutEmployee,
  resetPassword,
  refreshAuthToken,
};
