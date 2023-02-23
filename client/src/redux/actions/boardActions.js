import api from '../../utils/api';
import {
  PROJECT_BOARD_DETAILS_FAIL,
  PROJECT_BOARD_DETAILS_REQUEST,
  PROJECT_BOARD_DETAILS_SUCCESS,
} from '../constants/board.Constants';

export const getBoardsByProjectId =
  (projectId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROJECT_BOARD_DETAILS_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await api.get(`/boards/project/${projectId}`, config);
      dispatch({
        type: PROJECT_BOARD_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_BOARD_DETAILS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
