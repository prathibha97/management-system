const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema(
  {
    attendee: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
      },
    ],
    startDatetime: { type: Date, required: true },
    endDatetime: { type: Date, required: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
