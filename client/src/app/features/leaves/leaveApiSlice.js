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
    approveLeave: builder.mutation({
      query: ({ id, lId, status }) => ({
        url: `/leaves/${id}/approval/${lId}`,
        method: 'PUT',
        body: { status },
      }),
    }),
    rejectLeave: builder.mutation({
      query: ({ id, lId, status, reason }) => ({
        url: `/leaves/${id}/approval/${lId}`,
        method: 'PUT',
        body: { status, reason },
      }),
    }),
    getAllLeaves: builder.query({
      query: () => ({
        url: `/leaves`,
      }),
    }),
    deleteLeave: builder.mutation({
      query: ({leaveId}) => ({
        url: `/leaves/${leaveId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUserLeavesQuery,
  useRequestLeaveMutation,
  useApproveLeaveMutation,
  useRejectLeaveMutation,
  useGetAllLeavesQuery,
  useDeleteLeaveMutation,
} = leaveApiSlice;
