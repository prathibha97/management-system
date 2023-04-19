import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import attendanceReducer from '../features/attendance/attendanceSlice';
import projectReducer from '../features/projects/projectSlice';
import notificationReducer from '../features/notifications/notificationSlice';
import employeeReducer from '../features/employees/employeeSlice';
import meetingReducer from '../features/meetings/meetingSlice';
import experienceReducer from '../features/experiences/experienceSlice';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth'], // Only persist the 'auth' slice
// };

// const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    attendance: attendanceReducer,
    projects: projectReducer,
    notifications: notificationReducer,
    employees: employeeReducer,
    meetings: meetingReducer,
    experience: experienceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devtools: true,
});

// export const persistor = persistStore(store);