import {
  CREATE_LEAVE_FAIL,
  CREATE_LEAVE_REQUEST,
  CREATE_LEAVE_SUCCESS,
  GET_ALL_LEAVE_FAIL,
  GET_ALL_LEAVE_REQUEST,
  GET_ALL_LEAVE_SUCCESS,
  USER_LEAVE_DETAILS_FAIL,
  USER_LEAVE_DETAILS_REQUEST,
  USER_LEAVE_DETAILS_SUCCESS,
} from '../constants/leaveConstants';

export const leaveDetailsReducer = (state = { leaves: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LEAVE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LEAVE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        leaves: payload,
      };
    case USER_LEAVE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const leaveRequestReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_LEAVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        leaveRequest: payload,
      };
    case CREATE_LEAVE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const allLeaveDetailsReducer = (state = { leaves: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_LEAVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        leaves: payload,
      };
    case GET_ALL_LEAVE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};