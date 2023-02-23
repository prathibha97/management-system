import api from "../../utils/api";
import { USER_PROJECT_DETAILS_REQUEST ,USER_PROJECT_DETAILS_FAIL,USER_PROJECT_DETAILS_SUCCESS} from "../constants/projectConstants";

export const getUserProjectDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROJECT_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/projects/emp`, config);
    dispatch({
      type: USER_PROJECT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_PROJECT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
