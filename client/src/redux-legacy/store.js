/* eslint-disable camelcase */
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  adminAttendanceDetailsReducer,
  attendanceDetailsReducer,
  markAttendanceReducer,
} from './reducers/attendanceReducers';
import { projectBoardDetailsReducer } from './reducers/boardReducer';
import { clientListReducer } from './reducers/clientReducer';
import {
  departmentDetailsReducer,
  departmentEmployeeListReducer,
} from './reducers/departmentReducer';
import { getDesignationsAdminReducer } from './reducers/designationReducer';
import {
  employeeListReducer,
  registerEmployeeReducer,
  removeEmployeeReducer,
} from './reducers/employeeReducer';
import {
  addExperienceReducer,
  getExperienceReducer,
  removeExperienceReducer,
} from './reducers/experienceReducers';
import {
  adminLeaveDetailsReducer,
  allLeaveDetailsReducer,
  approveLeaveReducer,
  deleteLeaveRequestReducer,
  leaveDetailsReducer,
  leaveRequestReducer,
  rejectLeaveReducer,
} from './reducers/leaveReducer';
import {
  cancelMeetingReducer,
  editMeetingReducer,
  myMeetingsReducer,
  scheduleMeetingReducer,
} from './reducers/meetingsReducer';
import {
  clearNotificationReducer,
  readNotificationReducer,
  userNotificationsReducer,
} from './reducers/notificationsReducer';
import passwordRecoveryReducer from './reducers/passwordRecoveryReducer';
import {
  allProjectDetailsReducer,
  createProjectReducer,
  deleteProjectReducer,
  projectDetailsByIdReducer,
  userProjectDetailsReducer,
} from './reducers/projectReducer';
import {
  createTaskReducer,
  deleteTaskReducer,
  getTasksByProjectReducer,
  updateTaskReducer,
} from './reducers/taskReducer';
import {
  userDetailsAdminReducer,
  userDetailsReducer,
  userLoginReducer,
} from './reducers/userReducers';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const reducer = combineReducers({
  userLogin: userLoginReducer,
  registerEmployee: registerEmployeeReducer,
  passwordRecovery: passwordRecoveryReducer,
  removeEmployee: removeEmployeeReducer,
  userDetails: userDetailsReducer,
  userDetailsAdmin: userDetailsAdminReducer,
  addExperience: addExperienceReducer,
  getExperience: getExperienceReducer,
  removeExperience: removeExperienceReducer,
  attendanceDetails: attendanceDetailsReducer,
  adminAttendanceDetails: adminAttendanceDetailsReducer,
  markAttendance: markAttendanceReducer,
  leaveDetails: leaveDetailsReducer,
  adminLeaveDetails: adminLeaveDetailsReducer,
  leaveRequest: leaveRequestReducer,
  allLeaveDetails: allLeaveDetailsReducer,
  approveLeave: approveLeaveReducer,
  rejectLeave: rejectLeaveReducer,
  deleteLeaveRequest: deleteLeaveRequestReducer,
  userProjectDetails: userProjectDetailsReducer,
  projectDetailsById: projectDetailsByIdReducer,
  allProjectDetails: allProjectDetailsReducer,
  createProject: createProjectReducer,
  deleteProject: deleteProjectReducer,
  projectBoardDetails: projectBoardDetailsReducer,
  createTask: createTaskReducer,
  updateTask: updateTaskReducer,
  getTasksByProject: getTasksByProjectReducer,
  deleteTask: deleteTaskReducer,
  employeeList: employeeListReducer,
  departmentDetails: departmentDetailsReducer,
  departmentEmployeeList: departmentEmployeeListReducer,
  myMeetings: myMeetingsReducer,
  scheduleMeeting: scheduleMeetingReducer,
  editMeeting: editMeetingReducer,
  cancelMeeting: cancelMeetingReducer,
  getDesignationsAdmin: getDesignationsAdminReducer,
  userNotifications: userNotificationsReducer,
  readNotification: readNotificationReducer,
  clearNotification: clearNotificationReducer,
  clientList: clientListReducer,
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
