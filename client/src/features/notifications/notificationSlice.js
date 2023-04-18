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
      const { notification } = action.payload;
      state.notification = notification;
    },
    setClearNotifications: (state, action) => {
      const { notifications } = action.payload;
      state.notifications = notifications;
    },
  },
});

export const {
  setUserNotifications,
  setReadNotification,
  setClearNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
