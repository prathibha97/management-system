import api from '../../utils/api';
import {
  ALL_PROJECT_DETAILS_FAIL,
  ALL_PROJECT_DETAILS_REQUEST,
  ALL_PROJECT_DETAILS_SUCCESS,
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  PROJECT_DETAILS_BY_ID_FAIL,
  PROJECT_DETAILS_BY_ID_REQUEST,
  PROJECT_DETAILS_BY_ID_SUCCESS,
  USER_PROJECT_DETAILS_FAIL,
  USER_PROJECT_DETAILS_REQUEST,
  USER_PROJECT_DETAILS_SUCCESS,
} from '../constants/projectConstants';

export const getUserProjectDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROJECT_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/projects/emp`, config);
    dispatch({
      type: USER_PROJECT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_PROJECT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const ProjectDetailsById = (projectId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_DETAILS_BY_ID_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/projects/${projectId}`, config);
    dispatch({
      type: PROJECT_DETAILS_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_DETAILS_BY_ID_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getAllProjects = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_PROJECT_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/projects`, config);
    dispatch({
      type: ALL_PROJECT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ALL_PROJECT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createNewProject = (project) => async (dispatch, getState) => {
  const {
    title,
    category,
    department,
    client,
    deadline,
    team,
    designLink,
    specialNotes,
    projectScope,
    nftBaseDesignCount,
    nftTradeCount,
    nftCollectionSize,
  } = project;
  try {
    dispatch({
      type: CREATE_PROJECT_REQUEST,
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
      `/projects`,
      {
        title,
        category,
        department,
        client,
        deadline,
        team,
        designLink,
        specialNotes,
        projectScope,
        nftBaseDesignCount,
        nftTradeCount,
        nftCollectionSize,
      },
      config
    );
    dispatch({
      type: CREATE_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_PROJECT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteProject = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_PROJECT_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.delete(`/projects/${id}`, config);
    dispatch({
      type: CREATE_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_PROJECT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
