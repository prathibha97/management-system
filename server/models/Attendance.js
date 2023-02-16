const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  empNo: { type: String, required: true },
  inTime: { type: Date, required: true },
  outTime: { type: Date },
  date: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema)
