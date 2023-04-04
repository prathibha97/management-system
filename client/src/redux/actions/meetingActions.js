import api from '../../utils/api';
import {
  CANCEL_MEETING_FAIL,
  CANCEL_MEETING_REQUEST,
  CANCEL_MEETING_SUCCESS,
  MY_MEETINGS_FAIL,
  MY_MEETINGS_REQUEST,
  MY_MEETINGS_SUCCESS,
} from '../constants/meetingsConstants';

export const getMyMeetings = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_MEETINGS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.get(`/google/get_events`, config);
    dispatch({
      type: MY_MEETINGS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: MY_MEETINGS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const scheduleMeeting =
  (summary, attendee, startDatetime, endDatetime) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CANCEL_MEETING_REQUEST,
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
        `/google/schedule_event`,
        { summary, attendee, startDatetime, endDatetime },
        config
      );
      dispatch({
        type: CANCEL_MEETING_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: CANCEL_MEETING_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const cancelMeeting = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CANCEL_MEETING_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.delete(`/meetings/${id}`, config);
    dispatch({
      type: CANCEL_MEETING_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CANCEL_MEETING_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
