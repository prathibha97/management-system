import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notification: {},
    notifications: [],
  },
  reducers: {
    setUserNotifications: (state, action) => {
      const { notifications } = action.payload;
      state.notifications = notifications;
    },
    setReadNotification: (state, action) => {
      const notification = state.notifications.find(
        (item) => item.id === action.payload
      );
      if (notification) {
        notification.read = true;
      }
    },
    setClearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  setUserNotifications,
  setReadNotification,
  setClearNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
