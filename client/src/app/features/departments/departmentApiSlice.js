import { apiSlice } from '../../api/apiSlice';

export const departmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDepartment: builder.mutation({
      query: (department) => ({
        url: '/departments',
        method: 'POST',
        body: { ...department },
      }),
    }),
    getDepartments: builder.query({
      query: () => ({
        url: '/departments',
      }),
    }),
  }),
});

export const { useCreateDepartmentMutation, useGetDepartmentsQuery } =
  departmentApiSlice;
