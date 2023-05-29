const express = require('express');
const { protect, admin } = require('../middleware/auth.middleware');
const {
  getAllTimeRecords,
  createTimeRecord,
  updateTimeRecord,
  deleteTimeRecord,
  rejectTimeRecord,
  getMonthTotals,
  getTimeRecordsForEmployee,
  getMonthlyWeekTotals,
} = require('../controllers/timeRecord.controller');

const timeRecordRouter = express.Router();

timeRecordRouter.route('/').get(protect, admin, getAllTimeRecords).post(protect, createTimeRecord);

timeRecordRouter.route('/:id').put(protect, updateTimeRecord).delete(protect, deleteTimeRecord);

timeRecordRouter.put('/reject/:id', protect, admin, rejectTimeRecord);
timeRecordRouter.get('/employee/:id/month-totals', protect, getMonthTotals);
timeRecordRouter.get('/employee/:id/weekly-totals', protect, getMonthlyWeekTotals);
timeRecordRouter.get('/employee/:id', protect, getTimeRecordsForEmployee);

module.exports = timeRecordRouter;
