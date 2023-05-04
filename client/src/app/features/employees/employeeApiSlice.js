/* eslint-disable no-restricted-syntax */
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
      query: async ({employee}) =>
        // const formData = new FormData();

        // for (const [key, value] of Object.entries(employee)) {
        //   if (Array.isArray(value)) {
        //     // If the value is an array, assume it's a file input
        //     formData.append(key, value[0]);
        //   } else {
        //     formData.append(key, value);
        //   }
        // }
        ({
          url: `/emp/auth/register`,
          method: 'POST',
          body: { ...employee },
        }),
    }),

    // registerEmployee: builder.mutation({
    //   query: async (employee) => {
    //     const formData = new FormData();

    //     for (const [key, value] of Object.entries(employee)) {
    //       if (Array.isArray(value)) {
    //         // If the value is an array, assume it's a file input
    //         formData.append(key, value[0]);
    //       } else {
    //         formData.append(key, value);
    //       }
    //     }

    //     const { data } = await api.post(
    //       '/emp/auth/register',
    //       { formData },
    //       {
    //         headers: {
    //           'Content-Type': `multipart/form-data;`,
    //         },
    //       }
    //     );

    //     return { ...data };
    //   },
    // }),
  }),
});

export const {
  useEmployeeListQuery,
  useEmployeeProfileQuery,
  useRemoveEmployeeMutation,
  useEmployeeDetailsAdminQuery,
  useRegisterEmployeeMutation,
} = employeeApiSlice;
