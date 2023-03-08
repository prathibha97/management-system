import api from '../../utils/api';
import {
  APPROVE_LEAVE_FAIL,
  APPROVE_LEAVE_REQUEST,
  APPROVE_LEAVE_SUCCESS,
  CREATE_LEAVE_FAIL,
  CREATE_LEAVE_REQUEST,
  CREATE_LEAVE_SUCCESS,
  GET_ALL_LEAVE_REQUEST,
  GET_ALL_LEAVE_SUCCESS,
  REJECT_LEAVE_FAIL,
  REJECT_LEAVE_REQUEST,
  REJECT_LEAVE_SUCCESS,
  USER_LEAVE_DETAILS_FAIL,
  USER_LEAVE_DETAILS_REQUEST,
  USER_LEAVE_DETAILS_SUCCESS,
} from '../constants/leaveConstants';

export const getUserLeaveDetails = (empNo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LEAVE_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/leaves/${empNo}`, config);
    dispatch({
      type: USER_LEAVE_DETAILS_SUCCESS,
      payload: data,
    });
    localStorage.setItem('user', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LEAVE_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createLeaveRequest =
  (leaveType, startDate, endDate, reason) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_LEAVE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await api.post(
        '/leaves',
        {
          leaveType,
          startDate,
          endDate,
          reason,
        },
        config
      );

      dispatch({
        type: CREATE_LEAVE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_LEAVE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAllLeaveDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_LEAVE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/leaves/`, config);
    dispatch({
      type: GET_ALL_LEAVE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_LEAVE_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const approveLeaveRequest =
  ({ leaveId, empNo, status }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: APPROVE_LEAVE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await api.put(
        `/leaves/${empNo}/approval/${leaveId}`,
        { status },
        config
      );
      dispatch({
        type: APPROVE_LEAVE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: APPROVE_LEAVE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

  export const rejectLeaveRequest =
    ({ leaveId, empNo, status }) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: REJECT_LEAVE_REQUEST,
        });
        const {
          userLogin: { userInfo },
        } = getState();
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await api.put(
          `/leaves/${empNo}/approval/${leaveId}`,
          { status },
          config
        );
        dispatch({
          type: REJECT_LEAVE_SUCCESS,
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: REJECT_LEAVE_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      }
    };
