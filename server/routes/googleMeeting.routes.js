const express = require('express');
const {
  googleAuthenticate,
  googleRedirect,
  scheduleMeeting,
  getEvents,
  cancelEvent,
  editEvent
} = require('../controllers/googleMeeting.controller');
const { protect } = require('../middleware/auth.middleware');

const googleMeetingRouter = express.Router();

googleMeetingRouter.get('/', googleAuthenticate);
googleMeetingRouter.get('/redirect', googleRedirect);
googleMeetingRouter.get('/get_events', protect, getEvents);
googleMeetingRouter.post('/schedule_event', protect, scheduleMeeting);
googleMeetingRouter.delete('/:id', protect, cancelEvent);
googleMeetingRouter.put('/:id', protect, editEvent);

module.exports = googleMeetingRouter;
