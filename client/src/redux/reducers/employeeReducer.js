import {
  GET_ALL_EMPLOYEES_FAIL,
  GET_ALL_EMPLOYEES_REQUEST,
  GET_ALL_EMPLOYEES_SUCCESS,
} from '../constants/employeeConstants';

export const employeeListReducer = (state = { employees: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_EMPLOYEES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: payload,
      };
    case GET_ALL_EMPLOYEES_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
