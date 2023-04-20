import { apiSlice } from "../../api/apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userNotifications: builder.query({
      query: (empNo) => ({
        url: `/notifications/${empNo}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useUserNotificationsQuery } = notificationApiSlice;
