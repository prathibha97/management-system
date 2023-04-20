import { apiSlice } from '../../app/api/apiSlice';

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    markAttendance: builder.query({
      query: () => ({
        url: '/attendance',
      }),
    }),
  }),
});

export const { useMarkAttendanceQuery } = attendanceApiSlice;
