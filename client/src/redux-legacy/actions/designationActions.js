import api from '../../utils/api';
import {
  DESIGNATION_LIST_FAIL,
  DESIGNATION_LIST_REQUEST,
  DESIGNATION_LIST_SUCCESS,
} from '../constants/designationsConstants';

export const getDesignationListAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DESIGNATION_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/designations`, config);
    dispatch({
      type: DESIGNATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: DESIGNATION_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
