import { apiSlice } from '../../api/apiSlice';

export const timeRecordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTimeRecord: builder.mutation({
      query: (timeRecord) => ({
        url: `/timerecords`,
        method: 'POST',
        body: timeRecord,
      }),
    }),
    getAllTimeRecords: builder.query({
      query: () => ({
        url: `/timerecords`,
      }),
    }),
    editTimeRecord: builder.mutation({
      query: ({ id, timeRecord }) => ({
        url: `/timerecords/${id}`,
        method: 'PUT',
        body: { ...timeRecord },
      }),
    }),
    deleteTimeRecord: builder.mutation({
      query: ({ id }) => ({
        url: `/timerecords/${id}`,
        method: 'DELETE',
      }),
    }),
    rejectTimeRecord: builder.mutation({
      query: ({ id, rejectReason }) => ({
        url: `/timerecords/reject/${id}`,
        method: 'PUT',
        body: { rejectReason },
      }),
    }),
    getTimeRecordsByEmployeeCurrentMonth: builder.query({
      query: ({ id }) => ({
        url: `/timerecords/employee/${id}/month-totals`,
      }),
    }),
    getTimeRecordsByEmployee: builder.query({
      query: ({ id }) => ({
        url: `/timerecords/employee/${id}`,
      }),
    }),
    getWeeklyTimeRecordsForCurrentMonth: builder.query({
      query: ({ id }) => ({
        url: `/timerecords/employee/${id}/weekly-totals`
      }),
    }),
  }),
});

export const {
  useCreateTimeRecordMutation,
  useGetAllTimeRecordsQuery,
  useEditTimeRecordMutation,
  useDeleteTimeRecordMutation,
  useRejectTimeRecordMutation,
  useGetTimeRecordsByEmployeeCurrentMonthQuery,
  useGetTimeRecordsByEmployeeQuery,
  useGetWeeklyTimeRecordsForCurrentMonthQuery,
} = timeRecordApiSlice;
