import api from '../../utils/api';
import {
  CANCEL_MEETING_FAIL,
  CANCEL_MEETING_REQUEST,
  CANCEL_MEETING_SUCCESS,
  EDIT_MEETING_FAIL,
  EDIT_MEETING_REQUEST,
  EDIT_MEETING_SUCCESS,
  MY_MEETINGS_FAIL,
  MY_MEETINGS_REQUEST,
  MY_MEETINGS_SUCCESS,
  SCHEDULE_MEETING_FAIL,
  SCHEDULE_MEETING_REQUEST,
  SCHEDULE_MEETING_SUCCESS,
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
        type: SCHEDULE_MEETING_REQUEST,
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
        type: SCHEDULE_MEETING_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: SCHEDULE_MEETING_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const editMeeting =
  (id, summary, attendee, startDatetime, endDatetime) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_MEETING_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await api.put(
        `/google/${id}`,
        { summary, attendee, startDatetime, endDatetime },
        config
      );
      dispatch({
        type: EDIT_MEETING_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: EDIT_MEETING_FAIL,
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

    const { data } = await api.delete(`/google/${id}`, config);
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
