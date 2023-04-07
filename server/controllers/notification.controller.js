const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
  const { id } = req.params;
  try {
    const notifications = await Notification.find({ empNo: id }).sort({ createdAt: -1 });;
    return res.status(200).json(notifications);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occured while fetching the notifications' });
  }
}

const markNotificationAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    return res.json(notification);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong!' });
  }
}

const clearNotifications = async (req, res) => {
  const { empNo } = req.params;

  try {
    await Notification.deleteMany({ empNo });
    res.status(200).json({ message: 'Notifications cleared successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error clearing notifications', err });
  }
};


module.exports = {
  getNotifications,
  markNotificationAsRead,
  clearNotifications,
};