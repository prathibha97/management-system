/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const Board = require('./Board');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
    default: new Date(),
  },
  endDate: {
    type: Date,
  },
  scope: {
    type: String,
  },
  designLink: {
    type: String,
  },
  specialNotes: {
    type: String,
  },
  assignee: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
  ],
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],

  nftBaseDesignCount: {
    type: Number,
    default: 0,
  },
  nftTraitCount: {
    type: Number,
    default: 0,
  },
  nftCollectionSize: {
    type: Number,
    default: 0,
  },
  tag: {
    type: String,
  },
});

// Set the defaults for the new fields if the category is not NFT
projectSchema.pre('validate', function (next) {
  if (this.category !== 'NFT') {
    this.nftBaseDesignCount = 0;
    this.nftTradeCount = 0;
    this.nftCollectionSize = 0;
  }

  if (this.category === 'Web Development') {
    this.tag = 'WEB';
  } else if (this.category === 'NFT') {
    this.tag = 'NFT';
  } else if (this.category === 'Graphic Design') {
    this.tag = 'GD';
  } else if (this.category === 'Social Media Marketing') {
    this.tag = 'SMM';
  }

  next();
});


projectSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const project = this;

    const backlog = await Board.create({
      title: 'Backlog',
      description: 'List of tasks to be done',
      project: project._id,
    });

    const todo = await Board.create({
      title: 'To Do',
      description: 'List of tasks to be done next',
      project: project._id,
    });

    const inProgress = await Board.create({
      title: 'In Progress',
      description: 'List of tasks currently being worked on',
      project: project._id,
    });

    const review = await Board.create({
      title: 'Review',
      description: 'List of tasks waiting for review',
      project: project._id,
    });

    const completed = await Board.create({
      title: 'Completed',
      description: 'List of completed tasks',
      project: project._id,
    });

    project.boards = [backlog._id, todo._id, inProgress._id, review._id, completed._id];

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Project', projectSchema);
