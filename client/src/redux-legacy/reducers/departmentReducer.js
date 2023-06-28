import {
  DEPARTMENT_DETAILS_FAIL,
  DEPARTMENT_DETAILS_REQUEST,
  DEPARTMENT_DETAILS_SUCCESS,
  DEPARTMENT_EMPLOYEE_LIST_REQUEST,
  DEPARTMENT_EMPLOYEE_LIST_SUCCESS,
  DEPARTMENT_EMPLOYEE_LIST_FAIL,
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

export const departmentEmployeeListReducer = (
  state = { employees: [] },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case DEPARTMENT_EMPLOYEE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DEPARTMENT_EMPLOYEE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: payload,
      };
    case DEPARTMENT_EMPLOYEE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
