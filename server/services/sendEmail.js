/* eslint-disable prefer-promise-reject-errors */
// eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require('nodemailer');

function sendEmail({ email, subject, body}) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mailConfigs = {
      from: process.env.MY_EMAIL,
      to: email,
      subject,
      html: body,
    };
    transporter.sendMail(mailConfigs, (error, info) => {
      console.log(info);
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: 'Email sent succesfuly' });
    });
  });
}

module.exports = sendEmail;
