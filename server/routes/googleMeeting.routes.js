const express = require('express');
const {
  googleAuthenticate,
  googleRedirect,
  scheduleMeeting,
  getEvents,
  cancelEvent,
} = require('../controllers/googleMeeting.controller');
const { protect } = require('../middleware/auth.middleware');

const googleMeetingRouter = express.Router();

googleMeetingRouter.get('/', googleAuthenticate);
googleMeetingRouter.get('/redirect', googleRedirect);
googleMeetingRouter.get('/get_events', protect, getEvents);
googleMeetingRouter.post('/schedule_event', protect, scheduleMeeting);
googleMeetingRouter.delete('/:id', protect, cancelEvent);

module.exports = googleMeetingRouter;
