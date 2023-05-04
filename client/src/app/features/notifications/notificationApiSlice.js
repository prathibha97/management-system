import { apiSlice } from '../../api/apiSlice';

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userNotifications: builder.query({
      query: (empNo) => ({
        url: `/notifications/${empNo}`,
        method: 'GET',
      }),
    }),
    readNotification: builder.mutation({
      query: ({ id }) => ({
        url: `/notifications/${id}`,
        method: 'PUT',
      }),
    }),
    clearNotifications: builder.mutation({
      query: ({empNo}) => ({
        url: `/notifications/${empNo}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useUserNotificationsQuery,
  useReadNotificationMutation,
  useClearNotificationsMutation,
} = notificationApiSlice;
