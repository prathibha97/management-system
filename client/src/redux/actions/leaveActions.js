import api from '../../utils/api';
import {
  USER_LEAVE_DETAILS_FAIL,
  USER_LEAVE_DETAILS_REQUEST,
  USER_LEAVE_DETAILS_SUCCESS,
} from '../constants/leaveConstants';

export const getUserLeaveDetails = (empNo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LEAVE_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/leaves/${empNo}`, config);
    dispatch({
      type: USER_LEAVE_DETAILS_SUCCESS,
      payload: data,
    });
    console.log('action',data);
    localStorage.setItem('user', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LEAVE_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
