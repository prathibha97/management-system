const mongoose = require('mongoose')

const empSchema = new mongoose.Schema({
  empNo: {
    type: String,
    required: true,
  },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  employmentHistory: [
    {
      company: { type: String },
      position: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
    }

  ],
  projectHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    }
  ],
  idCardPath: { type: String },
  bankPassPath: { type: String },
  resumePath: { type: String },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  }
}, {
  timestamps: true
})

module.exports = mongoose.models.Employee || mongoose.model('Employee', empSchema)