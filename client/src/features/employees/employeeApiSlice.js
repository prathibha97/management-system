import { apiSlice } from '../../app/api/apiSlice';

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    employeeList: builder.query({
      query: () => ({
        url: `/emp`,
      }),
    }),
  }),
});

export const { useEmployeeListQuery } = employeeApiSlice;
