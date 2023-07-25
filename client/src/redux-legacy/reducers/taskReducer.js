import {
  CREATE_TASK_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  GET_TASKS_BY_PROJECT_FAIL,
  GET_TASKS_BY_PROJECT_REQUEST,
  GET_TASKS_BY_PROJECT_SUCCESS,
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

export const deleteTaskReducer = (state = { task: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        task: payload,
      };
    case DELETE_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const getTasksByProjectReducer = (state = { tasks: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TASKS_BY_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TASKS_BY_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: payload,
      };
    case GET_TASKS_BY_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
