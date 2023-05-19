const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  board: [
    {
      boardId: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true,
      },
      status: {
        type: String,
        enum: ['backlog', 'todo', 'in-progress', 'review', 'completed'],
      },
    },
  ],
  assignee: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  }],
});

module.exports = mongoose.model('Task', taskSchema);
 