import {
  ADMIN_LEAVE_DETAILS_FAIL,
  ADMIN_LEAVE_DETAILS_REQUEST,
  ADMIN_LEAVE_DETAILS_SUCCESS,
  APPROVE_LEAVE_FAIL,
  APPROVE_LEAVE_REQUEST,
  APPROVE_LEAVE_SUCCESS,
  CREATE_LEAVE_FAIL,
  CREATE_LEAVE_REQUEST,
  CREATE_LEAVE_SUCCESS,
  DELETE_LEAVE_FAIL,
  DELETE_LEAVE_REQUEST,
  DELETE_LEAVE_SUCCESS,
  GET_ALL_LEAVE_FAIL,
  GET_ALL_LEAVE_REQUEST,
  GET_ALL_LEAVE_SUCCESS,
  REJECT_LEAVE_FAIL,
  REJECT_LEAVE_REQUEST,
  REJECT_LEAVE_SUCCESS,
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

export const approveLeaveReducer = (state = { leave: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case APPROVE_LEAVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case APPROVE_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        leave: payload,
      };
    case APPROVE_LEAVE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const rejectLeaveReducer = (state = { leave: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case REJECT_LEAVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REJECT_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        leave: payload,
      };
    case REJECT_LEAVE_FAIL:
      return {
        ...state,
        loading: false,
        errorReject: payload,
      };
    default:
      return state;
  }
};

export const adminLeaveDetailsReducer = (state = { leaves: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_LEAVE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_LEAVE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        leaves: payload,
      };
    case ADMIN_LEAVE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const deleteLeaveRequestReducer = (state = { leave: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case DELETE_LEAVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        leave: payload,
      };
    case DELETE_LEAVE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};