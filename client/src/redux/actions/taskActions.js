import api from '../../utils/api';
import {
  CREATE_TASK_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
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
