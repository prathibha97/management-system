/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, setLogout } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:5000/api`,
  credentials: 'same-origin',
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    if (result.error.originalStatus === 403) {
      console.log('sending refresh token request');
      const refreshResult = await baseQuery(
        '/emp/auth/refresh',
        api,
        extraOptions
      );
      if (refreshResult.data) {
        const { user } = api.getState().auth;
        // update the token in the store
        api.dispatch(setCredentials({ ...refreshResult.data, user }));
        // retry the original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(setLogout());
      }
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
});
