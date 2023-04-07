const express = require('express');
const {
  getNotifications,
  markNotificationAsRead,
  clearNotifications
} = require('../controllers/notification.controller');

const { protect } = require('../middleware/auth.middleware');

const notificationRouter = express.Router();

notificationRouter.get('/:id', protect, getNotifications);
notificationRouter.put('/:id', markNotificationAsRead);
notificationRouter.delete('/:empNo', protect, clearNotifications);

module.exports = notificationRouter;
