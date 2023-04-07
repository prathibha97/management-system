import api from '../../utils/api';
import {
  CLEAR_NOTIFICATIONS_FAIL,
  CLEAR_NOTIFICATIONS_REQUEST,
  CLEAR_NOTIFICATIONS_SUCCESS,
  READ_NOTIFICATIONS_FAIL,
  READ_NOTIFICATIONS_REQUEST,
  READ_NOTIFICATIONS_SUCCESS,
  USER_NOTIFICATIONS_FAIL,
  USER_NOTIFICATIONS_REQUEST,
  USER_NOTIFICATIONS_SUCCESS,
} from '../constants/notificationConstants';

export const getUserNotifications = (empNo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_NOTIFICATIONS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.get(`/notifications/${empNo}`, config);

    dispatch({
      type: USER_NOTIFICATIONS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_NOTIFICATIONS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const MarkNotificationAsRead = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: READ_NOTIFICATIONS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.put(`/notifications/${id}`, config);

    dispatch({
      type: READ_NOTIFICATIONS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: READ_NOTIFICATIONS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const clearUserNotifications = (empNo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLEAR_NOTIFICATIONS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.delete(`/notifications/${empNo}`, config);

    dispatch({
      type: CLEAR_NOTIFICATIONS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CLEAR_NOTIFICATIONS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};