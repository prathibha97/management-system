const express = require('express');
const {
  getMeetings,
  createMeeting,
  getMyMeetings,
  updateMeeting,
  cancelMeeting,
} = require('../controllers/meetings.controller');

const { protect, admin } = require('../middleware/auth.middleware');

const meetingsRouter = express.Router();

meetingsRouter.get('/', protect, admin, getMeetings).post('/', protect, createMeeting);

meetingsRouter.get('/my', protect, getMyMeetings);

meetingsRouter.put('/:id', protect, updateMeeting).delete('/:id', protect, cancelMeeting);


module.exports = meetingsRouter;
