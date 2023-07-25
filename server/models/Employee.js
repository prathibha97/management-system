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
    nic: {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Designation',
    },
    dateOfAppointment: {
      type: String,
      required: true,
    },
    effectiveDate: {
      type: String,
      required: true,
    },
    paymentModel: {
      type: String,
      required: true,
    },
    bank: {
      type: String,
      required: true,
    },
    accountNo: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Admin', 'Employee', 'Manager', 'HR', '3rd Party'],
      default: 'Employee',
    },
    workType: {
      type: String,
      enum: ['Intern', 'Contract', 'Part-Time', 'Full-Time'],
    },
    employmentHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience',
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
      Casual: {
        type: Number,
        default() {
          if (['Intern', 'Contract', 'Part-Time'].includes(this.workType)) {
            return 2;
          }
          return 7;
        },
      },
      Annual: {
        type: Number,
        default() {
          if (['Intern', 'Contract', 'Part-Time'].includes(this.workType)) {
            return 0;
          }
          return 7;
        },
      },
      Maternity: {
        type: Number,
        default() {
          if (this.gender === 'Female') {
            return 7;
          }
          return 0;
        },
      },
      Medical: {
        type: Number,
        default() {
          if (['Intern', 'Contract', 'Part-Time'].includes(this.workType)) {
            return 1;
          }
          return 7;
        },
      },
      BroughtForward: {
        type: Number,
        default: 0,
      },
      Duty: {
        type: Number,
        default: 0,
      },
      NoPay: {
        type: Number,
        default: 0,
      },
    },
    refreshToken: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Employee', empSchema);
