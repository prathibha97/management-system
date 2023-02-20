const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  empNo: {
    type: String,
    required: true,
  },
  leaveType: {
    type: String,
    enum: ['Casual', 'Annual', 'Maternity', 'Other'],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approvedOn: {
    type: Date
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  rejectedOn: {
    type: Date
  },
  rejectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
});

module.exports = mongoose.models.Leave || mongoose.model('Leave', leaveSchema)
