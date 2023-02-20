import { USER_ATTENDANCE_DETAILS_FAIL, USER_ATTENDANCE_DETAILS_REQUEST, USER_ATTENDANCE_DETAILS_SUCCESS, USER_ATTENDANCE_MARK_FAIL, USER_ATTENDANCE_MARK_REQUEST, USER_ATTENDANCE_MARK_SUCCESS } from '../constants/attendanceConstants'

export const attendanceDetailsReducer = (state = { attendanceInfo: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ATTENDANCE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_ATTENDANCE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        attendanceInfo: payload,
      };
    case USER_ATTENDANCE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const markAttendanceReducer = (state = {attendance:{}}, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ATTENDANCE_MARK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_ATTENDANCE_MARK_SUCCESS:
      return {
        ...state,
        loading: false,
        attendance: payload,
      };
    case USER_ATTENDANCE_MARK_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};