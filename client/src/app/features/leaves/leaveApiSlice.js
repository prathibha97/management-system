import FormData from 'form-data';
import { apiSlice } from '../../api/apiSlice';

export const leaveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserLeaves: builder.query({
      query: (empNo) => ({
        url: `/leaves/${empNo}`,
      }),
    }),
    requestLeave: builder.mutation({
      query: (leave) => {
        const formData = new FormData();
        formData.append('medical', leave.medical);
        formData.append('endDate', leave.endDate);
        formData.append('leaveType', leave.leaveType);
        formData.append('startDate', leave.startDate);
        formData.append('reason', leave.reason);
        return {
          url: `/leaves`,
          method: 'POST',
          body: formData,
        };
      },
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
      query: ({ leaveId }) => ({
        url: `/leaves/${leaveId}`,
        method: 'DELETE',
      }),
    }),
    getEmployeeLeavesAdmin: builder.query({
      query: (empNo) => ({
        url: `/leaves/emp/${empNo}`,
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
  useGetEmployeeLeavesAdminQuery,
} = leaveApiSlice;
