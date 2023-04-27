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
    registerEmployee: builder.mutation({
      query: (employee, idCardPath, bankPassPath, resumePath) => ({
        url: `/emp/auth/register`,
        method: 'POST',

        body: { ...employee, ...idCardPath, ...bankPassPath, ...resumePath },
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
} = employeeApiSlice;
