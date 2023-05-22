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
  }),
});

export const {
  useCreateTimeRecordMutation,
  useGetAllTimeRecordsQuery,
  useEditTimeRecordMutation,
  useDeleteTimeRecordMutation,
} = timeRecordApiSlice;
