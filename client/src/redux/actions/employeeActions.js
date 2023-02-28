import api from '../../utils/api';
import {
  GET_ALL_EMPLOYEES_FAIL,
  GET_ALL_EMPLOYEES_REQUEST,
  GET_ALL_EMPLOYEES_SUCCESS,
  REGISTER_EMPLOYEE_FAIL,
  REGISTER_EMPLOYEE_REQUEST,
  REGISTER_EMPLOYEE_SUCCESS,
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

export const registerEmployee =
  (
    firstName,
    lastName,
    birthDate,
    email,
    password,
    phone,
    gender,
    nic,
    street,
    city,
    state,
    zip,
    empNo,
    designation,
    workType,
    department,
    employementHistoty,
    projectHistory,
    leaveBalance,
    isAdmin,
    idCardPath,
    bankPassPath,
    resumePath
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: REGISTER_EMPLOYEE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await api.post(
        `/emp/auth/register`,
        {
          firstName,
          lastName,
          birthDate,
          email,
          password,
          phone,
          gender,
          nic,
          street,
          city,
          state,
          zip,
          empNo,
          designation,
          workType,
          department,
          employementHistoty,
          projectHistory,
          leaveBalance,
          isAdmin,
          idCardPath,
          bankPassPath,
          resumePath,
        },
        config
      );
      dispatch({
        type: REGISTER_EMPLOYEE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_EMPLOYEE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
