import api from '../../utils/api';
import {
  CLIENT_LIST_FAIL,
  CLIENT_LIST_REQUEST,
  CLIENT_LIST_SUCCESS,
} from '../constants/clientConstants';

export const getClientList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/clients`, config);
    dispatch({
      type: CLIENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CLIENT_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
