import {
  PROJECT_BOARD_DETAILS_FAIL,
  PROJECT_BOARD_DETAILS_REQUEST,
  PROJECT_BOARD_DETAILS_SUCCESS,
} from '../constants/board.Constants';

export const projectBoardDetailsReducer = (state = { boards: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROJECT_BOARD_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROJECT_BOARD_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        boards: payload,
      };
    case PROJECT_BOARD_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
