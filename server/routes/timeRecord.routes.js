const express = require('express');
const { protect, admin } = require('../middleware/auth.middleware');
const {
  getAllTimeRecords,
  createTimeRecord,
  updateTimeRecord,
  deleteTimeRecord,
} = require('../controllers/timeRecord.controller');

const timeRecordRouter = express.Router();

timeRecordRouter.get('/', protect, admin, getAllTimeRecords).post('/', protect, createTimeRecord);
timeRecordRouter.put('/:id', protect, updateTimeRecord).delete('/:id', protect, deleteTimeRecord);

module.exports = timeRecordRouter;
