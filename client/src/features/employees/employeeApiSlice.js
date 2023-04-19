import { apiSlice } from '../../app/api/apiSlice';

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    employeeList: builder.query({
      query: () => ({
        url: `/emp`,
      }),
    }),
    employeeProfile: builder.query({
      query: (empNo) => ({
        url: `emp/profile/${empNo}`,
      }),
    }),
  }),
});

export const { useEmployeeListQuery, useEmployeeProfileQuery } =
  employeeApiSlice;
