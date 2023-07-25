/* eslint-disable no-restricted-syntax */
import FormData from 'form-data';
import { apiSlice } from '../../api/apiSlice';

const createFormData = (employee) => {
  const formData = new FormData();
  Object.entries(employee).forEach(([key, value]) => {
    if (
      key === 'idCardPath' ||
      key === 'bankPassPath' ||
      key === 'resumePath'
    ) {
      formData.append(key, value, value.name);
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    employeeList: builder.query({
      query: () => ({
        url: `/emp`,
      }),
    }),
    employeeProfile: builder.query({
      query: (empNo) => ({
        url: `/emp/profile/${empNo}`,
      }),
    }),
    removeEmployee: builder.mutation({
      query: ({ id }) => ({
        url: `/emp/${id}`,
        method: 'DELETE',
      }),
    }),
    employeeDetailsAdmin: builder.query({
      query: (empNo) => ({
        url: `/emp/${empNo}`,
      }),
    }),
    registerEmployee: builder.mutation({
      query: (employee) => ({
        url: `/emp/auth/register`,
        method: 'POST',
        body: createFormData(employee),
      }),
    }),
    editEmployee: builder.mutation({
      query: ({id,employee}) => ({
        url: `/emp/${id}`,
        method: 'PUT',
        body: createFormData(employee),
      }),
    }),
  }),
});

export const {
  useEmployeeListQuery,
  useEmployeeProfileQuery,
  useRemoveEmployeeMutation,
  useEmployeeDetailsAdminQuery,
  useRegisterEmployeeMutation,
  useEditEmployeeMutation
} = employeeApiSlice;
