const mongoose = require('mongoose');

const empSchema = new mongoose.Schema(
  {
    empNo: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
    },
    birthDate: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    workType: {
      type: String,
    },
    employmentHistory: [
      {
        company: { type: String },
        position: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
    projectHistory: [
      {
        project: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Project',
        },
        assignedOn: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    idCardPath: { type: String },
    bankPassPath: { type: String },
    resumePath: { type: String },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    leaveBalance: {
      casual: { type: Number, default: 10 },
      annual: { type: Number, default: 10 },
      maternity: { type: Number, default: 10 },
      other: { type: Number, default: 10 },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Employee || mongoose.model('Employee', empSchema);
