/* eslint-disable consistent-return */
const Attendance = require('../models/Attendance');

/* 
?@desc   Mark employee attendance
*@route  Post /api/attendance
*@access Private
*/

const markAttendance = async (req, res) => {
  const { empNo } = req.user;
  const existingAttendance = await Attendance.findOne({
    empNo,
    date: new Date().toISOString().slice(0, 10),
  });

  const timeZoneOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours ahead of UTC

  if (existingAttendance) {
    // Update the existing attendance record with the outTime
    const { outTime } = existingAttendance;
    if (outTime) {
      return res.status(400).json({ message: 'Attendance already marked for today' });
    }
    existingAttendance.outTime = new Date(Date.now() + timeZoneOffset).toISOString();
    const duration = (new Date(existingAttendance.outTime) - existingAttendance.inTime) / 1000; // duration in seconds
    existingAttendance.workHours = duration / 3600; // duration in hours
    await existingAttendance.save();
    return res.json(existingAttendance);
  }

  // Create a new attendance record with the inTime
  const attendance = new Attendance({
    empNo,
    date: new Date().toISOString().slice(0, 10),
    inTime: new Date(Date.now() + timeZoneOffset).toISOString(),
  });
  await attendance.save();
  return res.json(attendance);
};




/* 
?@desc   Get all attendance records
*@route  Get /api/attendance
*@access Private/Admin
*/

const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({})
    res.status(200).json(attendance)
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to collect attendance records' });
  }
}

/* 
?@desc   Get attendance records by employee  number
*@route  Get /api/attendance/:id
*@access Private
*/

const getAttendanceById = async (req, res) => {
  const { id } = req.params

  // Check if the empNo in the request matches the empNo of the logged-in user
  if (req.user.empNo !== id) {
    res.status(401).json({ message: 'You are not authorized to view this attendance record' });
    return;
  }
  
  try {
    const attendance = await Attendance.find({empNo: id})
    res.status(200).json(attendance)
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to collect attendance records' });
  }
}


const getAttendanceByIdAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const attendance = await Attendance.find({ empNo: id });
    res.status(200).json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to collect attendance records' });
  }
};

module.exports = {
  markAttendance,
  getAllAttendance,
  getAttendanceById,
  getAttendanceByIdAdmin,
};