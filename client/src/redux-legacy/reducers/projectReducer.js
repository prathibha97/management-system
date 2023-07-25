import {
  ALL_PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_BY_ID_FAIL,
  PROJECT_DETAILS_BY_ID_REQUEST,
  PROJECT_DETAILS_BY_ID_SUCCESS,
  USER_PROJECT_DETAILS_FAIL,
  USER_PROJECT_DETAILS_REQUEST,
  USER_PROJECT_DETAILS_SUCCESS,
  ALL_PROJECT_DETAILS_FAIL,
  ALL_PROJECT_DETAILS_SUCCESS,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL
} from '../constants/projectConstants';

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

export const projectDetailsByIdReducer = (state = { project: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROJECT_DETAILS_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROJECT_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        project: payload,
      };
    case PROJECT_DETAILS_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const allProjectDetailsReducer = (state = { projects: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case ALL_PROJECT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: payload,
      };
    case ALL_PROJECT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const createProjectReducer = (state = { project: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: payload,
      };
    case CREATE_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const deleteProjectReducer = (state = { project: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case DELETE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: payload,
      };
    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};