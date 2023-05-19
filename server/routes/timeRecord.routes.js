const express = require('express');
const { protect, admin } = require('../middleware/auth.middleware');
const { getAllTimeRecords, createTimeRecord } = require('../controllers/timeRecord.controller');

const timeRecordRouter = express.Router();

timeRecordRouter.get('/', protect, admin, getAllTimeRecords).post('/', protect, createTimeRecord);

module.exports = timeRecordRouter;
