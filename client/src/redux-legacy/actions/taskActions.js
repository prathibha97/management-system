import api from '../../utils/api';
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

export const createTask =
  (boardId, projectId, title, description, status, assignee) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_TASK_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await api.post(
        `/tasks`,
        { title, description, projectId, boardId, status, assignee },
        config
      );
      dispatch({
        type: CREATE_TASK_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: CREATE_TASK_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const updateTask = (id, boardId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_TASK_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.put(`/tasks/${id}`, boardId, config);
    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_TASK_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteTask = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_TASK_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.delete(`/tasks/${id}`, config);
    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: DELETE_TASK_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getTasksByProject = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_TASKS_BY_PROJECT_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/tasks/project/${id}`, config);
    dispatch({
      type: GET_TASKS_BY_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_TASKS_BY_PROJECT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
