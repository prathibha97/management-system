/* eslint-disable camelcase */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const fs = require('fs');
const api = require('./routes/api');
const { errorHandler, notFound } = require('./middleware/error.middleware');
const sendEmail = require('./services/sendEmail');
// const setCache = require('./middleware/cache.middleware');


const app = express();

const corsOptions = {
  origin: 'https://management-system-b022.onrender.com', // replace with your React app's URL
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// app.use(setCache);

app.use('/api', api);

// Serve the PDF files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, '..', 'server', 'uploads')));

// API endpoint to get the URL of a PDF file
app.get('/pdf', (req, res) => {
  const { filepath } = req.query;
  // res.json({ filepath });
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
  console.log(req.body);
  const { OTP, email } = req.body;
  sendEmail({ OTP, email })
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});



if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.use(notFound);
app.use(errorHandler);
module.exports = app;
