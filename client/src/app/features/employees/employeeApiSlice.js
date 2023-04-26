import { apiSlice } from '../../api/apiSlice';

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
  }),
});

export const {
  useEmployeeListQuery,
  useEmployeeProfileQuery,
  useRemoveEmployeeMutation,
  useEmployeeDetailsAdminQuery,
} = employeeApiSlice;
