/* eslint-disable camelcase */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const fs = require('fs');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const api = require('./routes/api');
const { errorHandler, notFound } = require('./middleware/error.middleware');
const sendEmail = require('./services/sendEmail');
// const { logger } = require('./middleware/logEvents');
const credentials = require('./middleware/credentials.middleware');
const corsOptions = require('./config/corsOptions');
const pwRecoveryTemplate = require('./email/passwordRecoveryTemplate');
const updateLeaveBalances = require('./utils/leaveBalanceUpdater');

const app = express();

// Handle options credentials check - before CORS! and fetch cookies credentials requirement
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json({ limit: '25mb' }));
app.use(bodyParser());
// app.use(express.urlencoded({ extended: false, limit: '25mb' }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Serve the PDF files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, '..', 'server', 'uploads')));

app.use('/api', api);

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
  const subject = 'SPHIRIA DIGITAL SYSTEM PASSWORD RECOVERY';
  const body = pwRecoveryTemplate(OTP);
  sendEmail({ email, subject, body })
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

// Cron job to update leave balances at the end of each year
cron.schedule('59 23 31 12 *', () => {
  updateLeaveBalances();
});

// const testUpdateLeaveBalances = async () => {
//   try {
//     console.log('Updating leave balances...');
//     await updateLeaveBalances();
//     console.log('Leave balances updated successfully.');
//   } catch (error) {
//     console.error('Error updating leave balances:', error.message);
//   }
// };

// testUpdateLeaveBalances();

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
