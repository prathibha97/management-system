import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import attendanceReducer from '../features/attendance/attendanceSlice';
import projectReducer from '../features/projects/projectSlice';
import notificationReducer from '../features/notifications/notificationSlice';
import employeeReducer from '../features/employees/employeeSlice';
import meetingReducer from '../features/meetings/meetingSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    attendance: attendanceReducer,
    projects: projectReducer,
    notifications: notificationReducer,
    employees: employeeReducer,
    meetings: meetingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devtools: true,
});
