/* eslint-disable camelcase */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const fs = require('fs');
const api = require('./routes/api');
const { errorHandler, notFound } = require('./middleware/error.middleware');
const sendEmail = require('./services/sendEmail');
// const { logger } = require('./middleware/logEvents');
const credentials = require('./middleware/credentials.middleware');
const corsOptions = require('./config/corsOptions');

const app = express();

// app.use(logger)

// Handle options credentials check - before CORS! and fetch cookies credentials requirement
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json({ limit: '25mb' }));
// app.use(bodyParser());
app.use(express.urlencoded({ extended: false, limit: '25mb' }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// app.use(setCache);

// Serve the PDF files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, '..', 'server', 'uploads')));

app.use('/api', api);

app.use(notFound);
app.use(errorHandler);

// API endpoint to get the URL of a PDF file
app.get('/pdf', (req, res) => {
  const { filepath } = req.query;
  const stat = fs.statSync(filepath);

  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Length': stat.size,
    'Content-Disposition': `attachment; filename=${filepath}`,
  });

  const readStream = fs.createReadStream(filepath);
  readStream.pipe(res);
});

app.post('/send_recovery_email', (req, res) => {
  const { OTP, email } = req.body;
  sendEmail({ OTP, email })
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build'));
  });
}

module.exports = app;
