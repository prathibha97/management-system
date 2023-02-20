import {
  USER_LEAVE_DETAILS_FAIL,
  USER_LEAVE_DETAILS_REQUEST,
  USER_LEAVE_DETAILS_SUCCESS,
} from '../constants/leaveConstants';

export const leaveDetailsReducer = (state = { leaves: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LEAVE_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case USER_LEAVE_DETAILS_SUCCESS:
      return {
        loading: false,
        leaves: payload,
      };
    case USER_LEAVE_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
