const mongoose = require('mongoose');

const timeRecordSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
    workPerformed: {
      type: String,
    },
    timeSpent: {
      type: String,
    },
    date: {
      type: Date,
    },
    status: {
      type: String,
    },
    rejectReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.TimeRecord || mongoose.model('TimeRecord', timeRecordSchema);
