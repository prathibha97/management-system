/* eslint-disable prefer-promise-reject-errors */
// eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require('nodemailer');

function sendEmail({ OTP, email }) {
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
      subject: 'SPHIRIA DIGITAL SYSTEM PASSWORD RECOVERY',
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset</title>
  </head>
  <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
    <div style="background-color: #F2F2F2; padding: 20px;">
      <table style="background-color: #fff; margin: 0 auto; max-width: 600px;">
        <tr>
          <td style="padding: 20px 0 10px 0; text-align: center;">
            <h1 style="color: #1DB3AB; margin: 0;">Sphiria Digital Studio</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px;">
            <p style="font-size: 16px; line-height: 1.5;">Dear User,</p>
            <p style="font-size: 16px; line-height: 1.5;">You recently requested to reset your password for your account. Please use the following One-Time Password (OTP) to complete the password recovery process:</p>
            <div style="background-color: #1DB3AB; border-radius: 5px; color: #fff; display: inline-block; font-size: 24px; font-weight: bold; margin: 20px 0; padding: 10px 20px; text-align: center;">
              ${OTP}
            </div>
            <p style="font-size: 16px; line-height: 1.5;">Please note that this OTP is only valid for 5 minutes. If you did not request a password reset, please ignore this email and contact us immediately.</p>
          </td>
        </tr>
        <tr>
          <td style="border-top: 1px solid #ddd; padding: 20px; text-align: right;">
            <p style="font-size: 14px; color: #777; margin: 0;">Sphiria Digital Studio</p>
            <p style="font-size: 14px; color: #777; margin: 0;">71/2 Sri Dharmapala Mawatha,</p>
            <p style="font-size: 14px; color: #777; margin: 0;">Kandy</p>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>`,
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
