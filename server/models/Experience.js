const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
  empNo: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, equired: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
}
);

module.exports = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
