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
    getClient: builder.query({
      query: (id) => ({
        url: `/clients/${id}`,
      }),
    }),
    removeClient: builder.mutation({
      query: ({ id }) => ({
        url: `/clients/${id}`,
        method: 'DELETE',
      }),
    }),
    editClient: builder.mutation({
      query: ({id, client}) => ({
        url: `/clients/${id}`,
        method: 'PUT',
        body: { ...client },
      }),
    }),
  }),
});

export const {
  useCreateClientMutation,
  useGetClientsQuery,
  useGetClientQuery,
  useRemoveClientMutation,
  useEditClientMutation
} = clientApiSlice;
