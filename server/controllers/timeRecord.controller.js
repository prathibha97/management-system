/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const TimeRecord = require('../models/TimeRecord');
const formatTime = require('../utils/formatTime');

/*
?@desc   get all time records
*@route  Get /api/timerecords/
*@access Private / Admin
*/

const getAllTimeRecords = async (req, res) => {
  try {
    const timeRecords = await TimeRecord.find()
      .populate('employee', 'name')
      .populate('project', 'title')
      .populate('task', 'title')
      .populate('client', 'name');
    return res.status(200).json(timeRecords);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while getting the time records' });
  }
};

/*
?@desc   create new time record
*@route  Post /api/timerecords/
*@access Private
*/

const createTimeRecord = async (req, res) => {
  const { project, task, date, timeSpent, client, workPerformed } = req.body;
  const { _id: employee } = req.user;

  console.log(req.body);

  // Convert timeSpent to "00:00:00" format if it's a number
  const formattedTimeSpent = typeof timeSpent === 'number' ? formatTime(timeSpent) : timeSpent;

  try {
    const timeRecord = await TimeRecord.create({
      employee,
      project: mongoose.Types.ObjectId(project),
      client,
      task: mongoose.Types.ObjectId(task),
      workPerformed,
      timeSpent: formattedTimeSpent,
      date,
    });

    return res.status(201).json({
      message: 'Time record created successfully',
      timeRecord,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while creating the time record' });
  }
};

/*
?@desc   update a time record
*@route  Put /api/timerecords/:id
*@access Private
*/

const updateTimeRecord = async (req, res) => {
  const { id } = req.params;
  const { project, task, date, timeSpent, client, workPerformed } = req.body;
  const { _id: employee } = req.user;
  try {
    const timeRecord = await TimeRecord.findByIdAndUpdate(
      id,
      {
        employee,
        project: mongoose.Types.ObjectId(project),
        client,
        task: mongoose.Types.ObjectId(task),
        workPerformed,
        timeSpent,
        date,
      },
      { new: true }
    );

    return res.status(201).json({
      message: 'Time record updated successfully',
      timeRecord,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while updating the time record' });
  }
};

/*
?@desc   delete a time record
*@route  Delete /api/timerecords/:id
*@access Private
*/

const deleteTimeRecord = async (req, res) => {
  const { id } = req.params;
  try {
    await TimeRecord.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Time record deleted successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while deleting the time record' });
  }
};

/*
?@desc   reject a time record
*@route  PUT /api/timerecords/reject/:id
*@access Private/Admin
*/

const rejectTimeRecord = async (req, res) => {
  const { id } = req.params;
  const { rejectReason } = req.body;
  console.log(req.body);
  try {
    const timeRecord = await TimeRecord.findById(id);

    timeRecord.status = 'rejected';
    timeRecord.rejectReason = rejectReason;

    await timeRecord.save();

    return res.status(200).json({ timeRecord, message: 'Time record rejected successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while rejecting the time record' });
  }
};

/*
  ?@desc   get month totals for an employee
  *@route  GET /api/timerecords/employee/:id/month-totals
  *@access Private
*/

const getMonthTotals = async (req, res) => {
  const { id } = req.params;
  try {
    // Get the current date
    const currentDate = new Date();

    // Extract the year and month from the current date
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based (0 - January, 1 - February, etc.)

    // Set the start date of the current month
    const startDate = new Date(currentYear, currentMonth - 1, 1); // Months are zero-based, so subtract 1
    startDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

    // Set the end date of the current month
    const endDate = new Date(currentYear, currentMonth, 0); // Months are zero-based
    endDate.setHours(23, 59, 59, 999); // Set hours, minutes, seconds, and milliseconds to the end of the day

    const timeRecords = await TimeRecord.find({
      employee: id,
      date: { $gte: startDate, $lte: endDate }, // Filter by date field within the specified range
    })
      .populate('employee', 'name')
      .populate('project', 'title')
      .populate('task', 'title')
      .populate('client', 'name');

    return res.status(200).json({ timeRecords, message: 'Time records fetched successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while fetching time records' });
  }
};

/*
  ?@desc   get time records for an employee
  *@route  GET /api/timerecords/employee/:id
  *@access Private
*/

const getTimeRecordsForEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const timeRecords = await TimeRecord.find({ employee: id })
      .populate('employee', 'name')
      .populate('project', 'title')
      .populate('task', 'title')
      .populate('client', 'name');

    return res.status(200).json({ timeRecords, message: 'Time records fetched successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while fetching time records' });
  }
}

/*
  ?@desc   get weekly totals for an employee
  *@route  GET /api/timerecords/employee/:id/week-totals
  *@access Private
*/

const getMonthlyWeekTotals = async (req, res) => {
  const { id } = req.params;
  try {
    // Get the current date
    const currentDate = new Date();

    // Extract the year and month from the current date
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based (0 - January, 1 - February, etc.)

    // Get the total number of days in the current month
    const totalDays = new Date(currentYear, currentMonth, 0).getDate();

    // Create an array to hold the weekly totals
    const weeklyTotals = [];

    // Loop through each week of the month
    for (let week = 1; week <= 5; week++) {
      // Calculate the start and end dates of the current week
      const weekStartDate = new Date(currentYear, currentMonth - 1, (week - 1) * 7 + 1);

      let weekEndDate;
      if (week === 5 && weekStartDate.getDate() + 6 > totalDays) {
        weekEndDate = new Date(currentYear, currentMonth - 1, totalDays);
      } else {
        weekEndDate = new Date(currentYear, currentMonth - 1, weekStartDate.getDate() + 6);
      }

      // Set the end time to the end of the day
      weekEndDate.setHours(23, 59, 59, 999);

      // Find the time records for the current week
      const timeRecords = await TimeRecord.find({
        employee: id,
        date: { $gte: weekStartDate, $lte: weekEndDate },
      })
        .populate('employee', 'name')
        .populate('project', 'title')
        .populate('task', 'title')
        .populate('client', 'name');

      // Calculate the total hours for the current week
      const totalHours = timeRecords.reduce((acc, record) => {
        const [hours, minutes, seconds] = record.timeSpent.split(':');
        const totalSeconds = +hours * 3600 + +minutes * 60 + +seconds;
        return acc + totalSeconds / 3600;
      }, 0);

      // Get the unique project count for the current week
      const projectCount = [...new Set(timeRecords.map((record) => record.project))].length;

      // Add the weekly totals to the array
      weeklyTotals.push({ weekStartDate, weekEndDate, totalHours, projectCount, timeRecords });
    }

    return res.status(200).json({ weeklyTotals, message: 'Weekly totals fetched successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while fetching weekly totals' });
  }
};

// const getMonthlyWeekTotals = async (req, res) => {
//   const { id, month } = req.params;
//   try {
//     // Parse the month parameter to an integer
//     const targetMonth = parseInt(month, 10);

//     // Get the current date
//     const currentDate = new Date();

//     // Extract the year from the current date
//     const currentYear = currentDate.getFullYear();

//     // Calculate the total number of days in the target month
//     const totalDays = new Date(currentYear, targetMonth, 0).getDate();

//     // Create an array to hold the weekly totals
//     const weeklyTotals = [];

//     // Loop through each week of the month
//     for (let week = 1; week <= 5; week++) {
//       // Calculate the start and end dates of the current week
//       const weekStartDate = new Date(currentYear, targetMonth - 1, (week - 1) * 7 + 1);

//       let weekEndDate;
//       if (week === 5 && weekStartDate.getDate() + 6 > totalDays) {
//         weekEndDate = new Date(currentYear, targetMonth - 1, totalDays);
//       } else {
//         weekEndDate = new Date(currentYear, targetMonth - 1, weekStartDate.getDate() + 6);
//       }

//       // Set the end time to the end of the day
//       weekEndDate.setHours(23, 59, 59, 999);

//       // Find the time records for the current week
//       const timeRecords = await TimeRecord.find({
//         employee: id,
//         date: { $gte: weekStartDate, $lte: weekEndDate },
//       })
//         .populate('employee', 'name')
//         .populate('project', 'title')
//         .populate('task', 'title')
//         .populate('client', 'name');

//       // Calculate the total hours for the current week
//       const totalHours = timeRecords.reduce((acc, record) => {
//         const [hours, minutes, seconds] = record.timeSpent.split(':');
//         const totalSeconds = +hours * 3600 + +minutes * 60 + +seconds;
//         return acc + totalSeconds / 3600;
//       }, 0);

//       // Get the unique project count for the current week
//       const projectCount = [...new Set(timeRecords.map((record) => record.project))].length;

//       // Add the weekly totals to the array
//       weeklyTotals.push({ weekStartDate, weekEndDate, totalHours, projectCount, timeRecords });
//     }

//     return res.status(200).json({ weeklyTotals, message: 'Weekly totals fetched successfully' });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: 'Error occurred while fetching weekly totals' });
//   }
// };





module.exports = {
  getAllTimeRecords,
  createTimeRecord,
  updateTimeRecord,
  deleteTimeRecord,
  rejectTimeRecord,
  getMonthTotals,
  getTimeRecordsForEmployee,
  getMonthlyWeekTotals,
};
