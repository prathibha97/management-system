import { apiSlice } from '../../api/apiSlice';

export const leaveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserLeaves: builder.query({
      query: (empNo) => ({
        url: `/leaves/${empNo}`,
      }),
    }),
    requestLeave: builder.mutation({
      query: (leave) => ({
        url: `/leaves`,
        method: 'POST',
        body: { ...leave },
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
  useGetUserLeavesQuery,
  useRequestLeaveMutation,
} = leaveApiSlice;
