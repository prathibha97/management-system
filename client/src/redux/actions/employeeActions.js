import api from '../../utils/api';
import {
  GET_ALL_EMPLOYEES_FAIL,
  GET_ALL_EMPLOYEES_REQUEST,
  GET_ALL_EMPLOYEES_SUCCESS,
} from '../constants/employeeConstants';

export const getEmployeeList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_EMPLOYEES_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/emp`, config);
    dispatch({
      type: GET_ALL_EMPLOYEES_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_EMPLOYEES_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
