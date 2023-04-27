import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiSlice } from './api/apiSlice';
import attendanceReducer from './features/attendance/attendanceSlice';
import authReducer from './features/auth/authSlice';
import departmentReducer from './features/departments/departmentSlice';
import designationReducer from './features/designations/designationSlice';
import employeeReducer from './features/employees/employeeSlice';
import experienceReducer from './features/experiences/experienceSlice';
import leaveReducer from './features/leaves/leaveSlice';
import meetingReducer from './features/meetings/meetingSlice';
import notificationReducer from './features/notifications/notificationSlice';
import projectReducer from './features/projects/projectSlice';

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
    departments: departmentReducer,
    designations: designationReducer,
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
