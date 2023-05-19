const TimeRecord = require('../models/TimeRecord');

/*
?@desc   get all time records
*@route  Get /api/timerecords/
*@access Private / Admin
*/

const getAllTimeRecords = async (req, res) => {
  try {
    const timeRecords = await TimeRecord.find();
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
  const { project, task, date, timeSpent, client } = req.body;
  const { _id: employee } = req.user;

  try {
    const timeRecord = await TimeRecord.create({
      employee,
      project,
      task,
      date,
      timeSpent,
      client,
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

module.exports = {
  getAllTimeRecords,
  createTimeRecord,
};
