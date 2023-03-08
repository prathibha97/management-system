import api from "../../utils/api";
import { USER_PROJECT_DETAILS_REQUEST ,USER_PROJECT_DETAILS_FAIL,USER_PROJECT_DETAILS_SUCCESS, PROJECT_DETAILS_BY_ID_REQUEST, PROJECT_DETAILS_BY_ID_SUCCESS, PROJECT_DETAILS_BY_ID_FAIL} from "../constants/projectConstants";

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

