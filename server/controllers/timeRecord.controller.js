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

module.exports = {
  getAllTimeRecords,
  createTimeRecord,
  updateTimeRecord,
  deleteTimeRecord,
  rejectTimeRecord,
};
