import {
  CLIENT_LIST_FAIL,
  CLIENT_LIST_REQUEST,
  CLIENT_LIST_SUCCESS,
} from '../constants/clientConstants';

export const clientListReducer = (state = { clients: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLIENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CLIENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        clients: payload,
      };
    case CLIENT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
