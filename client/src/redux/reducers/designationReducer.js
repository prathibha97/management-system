import {
  DESIGNATION_LIST_FAIL,
  DESIGNATION_LIST_REQUEST,
  DESIGNATION_LIST_SUCCESS,
} from '../constants/designationsConstants';

export const getDesignationsAdminReducer = (
  state = { designations: [] },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case DESIGNATION_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DESIGNATION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        designations: payload,
      };
    case DESIGNATION_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
