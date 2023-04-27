import { apiSlice } from '../../api/apiSlice';

export const designationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDesignation: builder.mutation({
      query: (designation) => ({
        url: '/designations',
        method: 'POST',
        body: { ...designation },
      }),
    }),
    getDesignations: builder.query({
      query: () => ({
        url: '/designations',
      }),
    }),
  }),
});

export const { useCreateDesignationMutation, useGetDesignationsQuery } =
  designationApiSlice;
