import api from "../../utils/api";
import { DEPARTMENT_DETAILS_REQUEST ,DEPARTMENT_DETAILS_SUCCESS,DEPARTMENT_DETAILS_FAIL, DEPARTMENT_EMPLOYEE_LIST_FAIL, DEPARTMENT_EMPLOYEE_LIST_SUCCESS, DEPARTMENT_EMPLOYEE_LIST_REQUEST} from "../constants/departmentConstants";

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

export const getDepartmentEmployeeList = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEPARTMENT_EMPLOYEE_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.get(`/departments/${id}/employees`, config);
    dispatch({
      type: DEPARTMENT_EMPLOYEE_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: DEPARTMENT_EMPLOYEE_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

