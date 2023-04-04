const express = require('express');
const {
  googleAuthenticate,
  googleRedirect,
  scheduleMeeting,
  getEvents,
} = require('../controllers/googleMeeting.controller');

const googleMeetingRouter = express.Router();

googleMeetingRouter.get('/', googleAuthenticate);
googleMeetingRouter.get('/redirect', googleRedirect);
googleMeetingRouter.get('/get_events', getEvents);
googleMeetingRouter.post('/schedule_event', scheduleMeeting);

module.exports = googleMeetingRouter;
