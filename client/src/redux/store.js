/* eslint-disable camelcase */
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { attendanceDetailsReducer, markAttendanceReducer } from './reducers/attendanceReducers';
import { userDetailsReducer, userLoginReducer } from './reducers/userReducers';


const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const reducer = combineReducers({
  
  userLogin: userLoginReducer,
  // userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  attendanceDetails: attendanceDetailsReducer,
  markAttendance: markAttendanceReducer,
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
