import {
  DEPARTMENT_DETAILS_FAIL,
  DEPARTMENT_DETAILS_REQUEST,
  DEPARTMENT_DETAILS_SUCCESS,
} from '../constants/departmentConstants';

export const departmentDetailsReducer = (
  state = { departments: [] },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case DEPARTMENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DEPARTMENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        departments: payload,
      };
    case DEPARTMENT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
