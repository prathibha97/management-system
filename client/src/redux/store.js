/* eslint-disable camelcase */
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  attendanceDetailsReducer,
  markAttendanceReducer,
} from './reducers/attendanceReducers';
import { projectBoardDetailsReducer } from './reducers/boardReducer';
import { departmentDetailsReducer } from './reducers/departmentReducer';
import {
  employeeListReducer,
  registerEmployeeReducer,
  removeEmployeeReducer,
} from './reducers/employeeReducer';
import {
  allLeaveDetailsReducer,
  approveLeaveReducer,
  leaveDetailsReducer,
  leaveRequestReducer,
  rejectLeaveReducer,
} from './reducers/leaveReducer';
import {
  cancelMeetingReducer,
  myMeetingsReducer,
  scheduleMeetingReducer,
} from './reducers/meetingsReducer';
import {
  projectDetailsByIdReducer,
  userProjectDetailsReducer,
} from './reducers/projectReducer';
import {
  createTaskReducer,
  deleteTaskReducer,
  getTasksByProjectReducer,
  updateTaskReducer,
} from './reducers/taskReducer';
import { userDetailsReducer, userLoginReducer } from './reducers/userReducers';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const reducer = combineReducers({
  userLogin: userLoginReducer,
  registerEmployee: registerEmployeeReducer,
  removeEmployee: removeEmployeeReducer,
  userDetails: userDetailsReducer,
  attendanceDetails: attendanceDetailsReducer,
  markAttendance: markAttendanceReducer,
  leaveDetails: leaveDetailsReducer,
  leaveRequest: leaveRequestReducer,
  allLeaveDetails: allLeaveDetailsReducer,
  approveLeave: approveLeaveReducer,
  rejectLeave: rejectLeaveReducer,
  userProjectDetails: userProjectDetailsReducer,
  projectDetailsById: projectDetailsByIdReducer,
  projectBoardDetails: projectBoardDetailsReducer,
  createTask: createTaskReducer,
  updateTask: updateTaskReducer,
  getTasksByProject: getTasksByProjectReducer,
  deleteTask: deleteTaskReducer,
  employeeList: employeeListReducer,
  departmentDetails: departmentDetailsReducer,
  myMeetings: myMeetingsReducer,
  scheduleMeeting: scheduleMeetingReducer,
  cancelMeeting: cancelMeetingReducer,
  // userUpdateProfile: userUpdateProfileReducer,
  // userList: userListReducer,
  // userDelete: userDeleteReducer,
  // userUpdate: userUpdateReducer,
});

const middleware = [thunk];

const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
