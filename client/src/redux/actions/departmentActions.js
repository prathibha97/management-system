import api from "../../utils/api";
import { DEPARTMENT_DETAILS_REQUEST ,DEPARTMENT_DETAILS_SUCCESS,DEPARTMENT_DETAILS_FAIL} from "../constants/departmentConstants";

export const getDepartmentDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEPARTMENT_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/departments`, config);
    dispatch({
      type: DEPARTMENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: DEPARTMENT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
