import { ADD_EXPERIENCE_FAIL, ADD_EXPERIENCE_REQUEST, ADD_EXPERIENCE_SUCCESS } from "../constants/experienceConstants";

export const addExperienceReducer = (state = { experience: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_EXPERIENCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_EXPERIENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        experience: payload,
      };
    case ADD_EXPERIENCE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const getExperienceReducer = (state = { experiences: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_EXPERIENCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_EXPERIENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        experiences: payload,
      };
    case ADD_EXPERIENCE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

