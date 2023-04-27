import { apiSlice } from '../../api/apiSlice';

export const meetingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    myMeeting: builder.query({
      query: () => ({
        url: `/google/get_events`,
      }),
    }),
    scheduleMeeting: builder.mutation({
      query: (meeting) => ({
        url: `/google/schedule_event`,
        method: 'POST',
        body: { ...meeting },
      }),
    }),
    cancelMeeting: builder.mutation({
      query: ({id}) => ({
        url: `/google/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useMyMeetingQuery,
  useScheduleMeetingMutation,
  useCancelMeetingMutation,
} = meetingApiSlice;
