import api from '../../utils/api';
import {
  ADD_EXPERIENCE_FAIL,
  ADD_EXPERIENCE_REQUEST,
  ADD_EXPERIENCE_SUCCESS,
  GET_USER_EXPERIENCES_FAIL,
  GET_USER_EXPERIENCES_REQUEST,
  GET_USER_EXPERIENCES_SUCCESS,
} from '../constants/experienceConstants';

export const addExperience =
  (position, company, startDate, endDate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_EXPERIENCE_REQUEST,
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
        `/experiences`,
        { position, company, startDate, endDate },
        config
      );
      dispatch({
        type: ADD_EXPERIENCE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ADD_EXPERIENCE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const getExperiences = (empNo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_EXPERIENCES_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/experiences/${empNo}`, config);
    dispatch({
      type: GET_USER_EXPERIENCES_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_EXPERIENCES_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
