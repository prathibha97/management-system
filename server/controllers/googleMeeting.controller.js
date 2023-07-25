/* eslint-disable camelcase */
const { google } = require('googleapis');
const { v4: uuid } = require('uuid');
const Token = require('../models/Token');

const calendar = google.calendar({
  version: 'v3',
  auth: process.env.GOOGLE_CALENDAR_API_KEY,
});

const scopes = ['https://www.googleapis.com/auth/calendar'];

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

const googleAuthenticate = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.redirect(url);
};

const googleRedirect = async (req, res) => {
  const { code } = req.query;

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  if (tokens.refresh_token) {
    const refresh_token = new Token({ name: 'refresh_token', value: tokens.refresh_token });
    await refresh_token.save();
  }
  const access_token = new Token({ name: 'access_token', value: tokens.access_token });
  await access_token.save();

  res.redirect('http://ec2-34-217-133-161:5000/dashboard'); // Redirect to the React app
};

const scheduleMeeting = async (req, res) => {
  const { summary, attendee, startDatetime, endDatetime } = req.body;
  const refresh_token = await Token.findOne({ name: 'refresh_token' });
  const access_token = await Token.findOne({ name: 'access_token' });

  oauth2Client.setCredentials({
    refresh_token: refresh_token.value,
    access_token: access_token.value,
  });

  const { data } = await calendar.events.insert({
    calendarId: 'primary',
    auth: oauth2Client,
    conferenceDataVersion: 1,
    requestBody: {
      summary,
      description: 'This is a test event',
      start: {
        dateTime: startDatetime,
        timeZone: 'Asia/Colombo',
      },
      end: {
        dateTime: endDatetime,
        timeZone: 'Asia/Colombo',
      },
      conferenceData: {
        createRequest: {
          requestId: uuid(),
        },
      },
      attendees: [{ email: attendee }],
    },
  });

  res.send({
    msg: 'Event scheduled',
    data,
  });
};

const getEvents = async (req, res) => {
    const refresh_token = await Token.findOne({ name: 'refresh_token' });
    const access_token = await Token.findOne({ name: 'access_token' });

    oauth2Client.setCredentials({
      refresh_token: refresh_token.value,
      access_token: access_token.value,
    });

  try {
    const {data}  = await calendar.events.list({
      calendarId: 'primary',
      auth: oauth2Client,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    res.status(200).json( data.items );
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Unable to retrieve events' });
  }
};

const cancelEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const {data}  = await calendar.events.delete({
      calendarId: 'primary',
      eventId:id,
      auth: oauth2Client,
    });
    res.status(200).json( data );
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Unable to cancel event' });
  }
}

const editEvent = async (req, res) => {
  const { id } = req.params;
  const { summary, attendee, startDatetime, endDatetime } = req.body;

  try {
    const {data}  = await calendar.events.update({
      calendarId: 'primary',
      eventId:id,
      auth: oauth2Client,
      requestBody: {
        summary,
        description: 'This is a test event',
        start: {
          dateTime: startDatetime,
          timeZone: 'Asia/Colombo',
        },
        end: {
          dateTime: endDatetime,
          timeZone: 'Asia/Colombo',
        },
        conferenceData: {
          createRequest: {
            requestId: uuid(),
          },
        },
        attendees: [{ email: attendee }],
      },
    });
    res.status(200).json( data );
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Unable to edit event' });
  }
}

module.exports = {
  googleAuthenticate,
  googleRedirect,
  scheduleMeeting,
  getEvents,
  cancelEvent,
  editEvent,
};

