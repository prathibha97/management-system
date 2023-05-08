import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/emp/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: '/emp/auth/logout',
      }),
    }),
  }),
});

export const { useLoginMutation, useLazyLogoutQuery } = authApiSlice;
