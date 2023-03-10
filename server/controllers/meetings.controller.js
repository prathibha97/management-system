/*
?@desc   Get all meetings
*@route  Get /api/meetings
*@access Private
*/

const Meeting = require('../models/Meetings');

const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().populate('attendee', 'name');
    return res.status(200).json(meetings);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occured while fetching the meetings' });
  }
};

/*
?@desc   Create a meeting
*@route  Post /api/meetings
*@access Private
*/
const createMeeting = async (req, res) => {
  const { attendee, startDatetime, endDatetime } = req.body;
  const start = Date.parse(startDatetime);
  const end = Date.parse(endDatetime);
  try {
    const newMeeting = await Meeting.create({
      attendee,
      startDatetime: start,
      endDatetime: end,
    });
    return res.status(201).json(newMeeting);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occured while creating the meeting' });
  }
};

/*
?@desc   Get meetings assigned to current logged in employee
*@route  Get /api/meetings/my
*@access Private
*/
const getMyMeetings = async (req, res) => {
  try {
    const employeeId = req.user._id; // assuming the employee ID is stored in the "id" field of the user object
    const meetings = await Meeting.find({ attendee: employeeId }).populate('attendee', 'name');
    return res.status(200).json(meetings);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occured while fetching the meetings' });
  }
};

/*
?@desc   Update a meeting
*@route  Put /api/meetings/:id
*@access Private
*/
const updateMeeting = async (req, res) => {
  const { attendee, startDatetime, endDatetime } = req.body;
  const start = Date.parse(startDatetime);
  const end = Date.parse(endDatetime);
  const { id } = req.params;
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      id,
      {
        attendee,
        startDatetime: start,
        endDatetime: end,
      },
      { new: true }
    ).populate('attendee', 'name');
    return res.status(200).json({ meeting, message: 'Meeting updated successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occured while updating the meeting' });
  }
};

/*
?@desc   Cancel a meeting
*@route  Delete /api/meetings/:id
*@access Private
*/
const cancelMeeting = async (req, res) => {
  const { id } = req.params;
  try {
    await Meeting.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Meeting cancelled successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occured while cancelling the meeting' });
  }
};

module.exports = {
  getMeetings,
  createMeeting,
  getMyMeetings,
  updateMeeting,
  cancelMeeting,
};
