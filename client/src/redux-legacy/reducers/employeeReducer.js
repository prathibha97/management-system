import {
  GET_ALL_EMPLOYEES_FAIL,
  GET_ALL_EMPLOYEES_REQUEST,
  GET_ALL_EMPLOYEES_SUCCESS,
  REGISTER_EMPLOYEE_FAIL,
  REGISTER_EMPLOYEE_REQUEST,
  REGISTER_EMPLOYEE_SUCCESS,
  REMOVE_EMPLOYEE_FAIL,
  REMOVE_EMPLOYEE_REQUEST,
  REMOVE_EMPLOYEE_SUCCESS,
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

export const registerEmployeeReducer = (state = { employee: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employee: payload,
      };
    case REGISTER_EMPLOYEE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const removeEmployeeReducer = (state = { employee: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case REMOVE_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employee: payload,
      };
    case REMOVE_EMPLOYEE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
