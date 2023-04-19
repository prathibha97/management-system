import { apiSlice } from '../../app/api/apiSlice';

export const experienceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserExperiences: builder.query({
      query: (empNo) => ({
        url: `/experiences/${empNo}`,
      }),
    }),
    addExperience: builder.mutation({
      query: (experience) => ({
        url: `/experiences`,
        method: 'POST',
        body: { ...experience },
      }),
    }),
    removeExperience: builder.mutation({
      query: (id) => ({
        url: `/experiences/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUserExperiencesQuery,
  useLazyGetUserExperiencesQuery,
  useAddExperienceMutation,
  useRemoveExperienceMutation,
} = experienceApiSlice;
