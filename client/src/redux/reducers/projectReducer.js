import { USER_PROJECT_DETAILS_REQUEST,USER_PROJECT_DETAILS_FAIL,USER_PROJECT_DETAILS_SUCCESS } from "../constants/projectConstants";

export const userProjectDetailsReducer = (state = { projects: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_PROJECT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: payload,
      };
    case USER_PROJECT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
