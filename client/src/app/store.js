import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiSlice } from './api/apiSlice';
import authReducer from './features/auth/authSlice';
import attendanceReducer from './features/attendance/attendanceSlice';
import projectReducer from './features/projects/projectSlice';
import notificationReducer from './features/notifications/notificationSlice';
import employeeReducer from './features/employees/employeeSlice';
import meetingReducer from './features/meetings/meetingSlice';
import experienceReducer from './features/experiences/experienceSlice';
import leaveReducer from './features/leaves/leaveSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    attendance: attendanceReducer,
    projects: projectReducer,
    notifications: notificationReducer,
    employees: employeeReducer,
    meetings: meetingReducer,
    experience: experienceReducer,
    leaves: leaveReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devtools: true,
});

export const persistor = persistStore(store);
