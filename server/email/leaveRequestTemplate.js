const leaveRequestTemplate = (
  employeeName,
  leaveType,
  startDate,
  endDate,
  reason
) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Leave Request</title>
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
            <p style="font-size: 16px; line-height: 1.5;">Dear HR Department,</p>
            <p style="font-size: 16px; line-height: 1.5;">An employee has requested leave:</p>
            <p style="font-size: 16px; line-height: 1.5;"><strong>Employee Name:</strong> ${employeeName}</p>
            <p style="font-size: 16px; line-height: 1.5;"><strong>Leave Type:</strong> ${leaveType}</p>
            <p style="font-size: 16px; line-height: 1.5;"><strong>Start Date:</strong> ${startDate}</p>
            <p style="font-size: 16px; line-height: 1.5;"><strong>End Date:</strong> ${endDate}</p>
            <p style="font-size: 16px; line-height: 1.5;"><strong>Reason:</strong> ${reason}</p>
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
</html>`;

module.exports = leaveRequestTemplate;
