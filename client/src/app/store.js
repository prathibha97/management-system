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
import boardReducer from './features/boards/boardSlice';
import clientReducer from './features/clients/clientSlice';
import departmentReducer from './features/departments/departmentSlice';
import designationReducer from './features/designations/designationSlice';
import employeeReducer from './features/employees/employeeSlice';
import experienceReducer from './features/experiences/experienceSlice';
import leaveReducer from './features/leaves/leaveSlice';
import meetingReducer from './features/meetings/meetingSlice';
import notificationReducer from './features/notifications/notificationSlice';
import passwordReducer from './features/passwordRecovery/passwordRecoverySlice';
import projectReducer from './features/projects/projectSlice';
import taskReducer from './features/tasks/taskSlice';
import timeRecordReducer from './features/timeRecords/timeRecordsSlice';
import timerReducer from './features/timer/timerSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['projects.scope'],
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
    clients: clientReducer,
    boards: boardReducer,
    tasks: taskReducer,
    password: passwordReducer,
    timer: timerReducer,
    timeRecord: timeRecordReducer,
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
