const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  empNo: {
    type: String,
    required: true,
  },
  leaveType: {
    type: String,
    enum: ['casual', 'sick', 'maternity', 'paternity', 'bereavement'],
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
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approvedOn: {
    type: Date
  },
  approvedBy: {
    type: String
  },
  rejectedOn: {
    type: Date
  },
  rejectedBy: {
    type: String
  },
});

module.exports = mongoose.models.Leave || mongoose.model('Leave', leaveSchema)
