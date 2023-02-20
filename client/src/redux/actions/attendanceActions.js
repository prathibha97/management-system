import api from '../../utils/api';
import {
  USER_ATTENDANCE_DETAILS_FAIL,
  USER_ATTENDANCE_DETAILS_REQUEST,
  USER_ATTENDANCE_DETAILS_SUCCESS,
  USER_ATTENDANCE_MARK_FAIL,
  USER_ATTENDANCE_MARK_REQUEST,
  USER_ATTENDANCE_MARK_SUCCESS,
} from '../constants/attendanceConstants';

export const getAttendanceDetailsbyId =
  (empNo) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_ATTENDANCE_DETAILS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await api.get(`/attendance/${empNo}`, config);

      dispatch({
        type: USER_ATTENDANCE_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: USER_ATTENDANCE_DETAILS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const markAttendance = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ATTENDANCE_MARK_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.get(`/attendance`, config);
    console.log('Response Data:', data);
    dispatch({
      type: USER_ATTENDANCE_MARK_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_ATTENDANCE_MARK_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
