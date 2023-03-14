import {
  CANCEL_MEETING_FAIL,
  CANCEL_MEETING_REQUEST,
  CANCEL_MEETING_SUCCESS,
  MY_MEETINGS_FAIL,
  MY_MEETINGS_REQUEST,
  MY_MEETINGS_SUCCESS,
  SCHEDULE_MEETING_FAIL,
  SCHEDULE_MEETING_REQUEST,
  SCHEDULE_MEETING_SUCCESS,
} from '../constants/meetingsConstants';

export const myMeetingsReducer = (state = { meetings: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case MY_MEETINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_MEETINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        meetings: payload,
      };
    case MY_MEETINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const scheduleMeetingReducer = (state = { meeting: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case SCHEDULE_MEETING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SCHEDULE_MEETING_SUCCESS:
      return {
        ...state,
        loading: false,
        meeting: payload,
      };
    case SCHEDULE_MEETING_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const cancelMeetingReducer = (state = { meeting: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case CANCEL_MEETING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CANCEL_MEETING_SUCCESS:
      return {
        ...state,
        loading: false,
        meeting: payload,
      };
    case CANCEL_MEETING_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
