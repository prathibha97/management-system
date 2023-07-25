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
  assignee: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
  ],
  tag: {
    type: String,
  },
});

taskSchema.pre('save', async function (next) {
  try {
    const project = await mongoose.model('Project').findById(this.project);
    if (project) {
      const category = project.category.toLowerCase().split(' ').join('');
      this.tag = category.substring(0, 3);
    }
    return next();
  } catch (err) {
    return next(err);
  }
});


module.exports = mongoose.model('Task', taskSchema);
