import { apiSlice } from '../../app/api/apiSlice';

export const experienceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserExperiences: builder.query({
      query: (empNo) => ({
        url: `/experiences/${empNo}`,
      }),
    }),
  }),
});

export const { useGetUserExperiencesQuery } = experienceApiSlice;
