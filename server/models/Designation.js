const mongoose = require('mongoose');

const designationScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  basicSalary: {
    type: Number,
    required: true,
    default: 0,
  },
  advance: {
    type: Boolean,
    required: true,
  },
  maxAdvance: {
    type: Number,
    required: true,
    default: 0,
  },
  noOfAdvances: {
    type: Number,
    required: true,
    default: 0,
  },
  providentFund: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.models.Designation || mongoose.model('Designation', designationScheme);
