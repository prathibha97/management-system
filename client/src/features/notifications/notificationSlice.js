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
  },
});

export const { setUserNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
