const Employee = require('../models/Employee');
const Meeting = require('../models/Meetings');
const io = require('../services/socket');

/*
?@desc   Get all meetings
*@route  Get /api/meetings
*@access Private
*/

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

  const { empNo } = await Employee.findById(attendee);
  try {
    const newMeeting = await Meeting.create({
      attendee,
      startDatetime: start,
      endDatetime: end,
    });

    // Notify employee about meeting
    const message = `You have been added to a new scheduled meeting`;
    const payload = { message };
    const channel = `private-${empNo}`;
    io.to(channel).emit('meeting-created', payload);

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
    const employeeId = req.user._id;
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

  const { empNo } = await Employee.findById(attendee);

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

    // Notify employee about meeting

    const message = `The meeting details have been updated`;
    const payload = { message };
    const channel = `private-${empNo}`;
    io.to(channel).emit('meeting-updated', payload);

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
    const meeting = await Meeting.findByIdAndDelete(id);
    const attendee = meeting.attendee._id;
    const { empNo } = await Employee.findById(attendee);

   // Notify employee about meeting

    const message = `The meeting has been cancelled`;
    const payload = { message };
    const channel = `private-${empNo}`;
    io.to(channel).emit('meeting-cancelled', payload);

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
