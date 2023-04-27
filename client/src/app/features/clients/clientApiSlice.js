import { apiSlice } from '../../api/apiSlice';

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createClient: builder.mutation({
      query: (client) => ({
        url: '/clients',
        method: 'POST',
        body: { ...client },
      }),
    }),
    getClients: builder.query({
      query: () => ({
        url: '/clients',
      }),
    }),
  }),
});

export const { useCreateClientMutation, useGetClientsQuery } = clientApiSlice;
