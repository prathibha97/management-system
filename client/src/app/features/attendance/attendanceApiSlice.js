import { apiSlice } from "../../api/apiSlice";

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    markAttendance: builder.query({
      query: () => ({
        url: '/attendance',
      }),
    }),
    getEmployeeAttendance: builder.query({
      query: (id) => ({
        url: `/attendance/${id}`,
      }),
    }),
  }),
});

export const { 
  useMarkAttendanceQuery,
  useGetEmployeeAttendanceQuery,
 } = attendanceApiSlice;
