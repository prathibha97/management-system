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

export const userNotificationsReducer = (
  state = { notifications: [] },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case USER_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: payload,
      };
    case USER_NOTIFICATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const readNotificationReducer = (
  state = { notification: {} },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case READ_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case READ_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notification: payload,
      };
    case READ_NOTIFICATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const clearNotificationReducer = (
  state = { notifications: [] },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: payload,
      };
    case CLEAR_NOTIFICATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
