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
    getDepartmentEmployeeList: builder.query({
      query: (departmentId) => ({
        url: `/departments/${departmentId}/employees`,
      })
    })
  }),
});

export const { 
  useCreateDepartmentMutation, 
  useGetDepartmentsQuery,
  useGetDepartmentEmployeeListQuery,
 } =
  departmentApiSlice;
