import {
  CREATE_TASK_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from '../constants/taskConstants';

export const updateTaskReducer = (state = { task: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        task: payload,
      };
    case UPDATE_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const createTaskReducer = (state = { task: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        task: payload,
      };
    case CREATE_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
