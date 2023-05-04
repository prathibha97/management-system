import { apiSlice } from '../../api/apiSlice';

export const boardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjectBoardsById: builder.query({
      query: (projectId) => ({
        url: `/boards/project/${projectId}`,
      }),
    }),
  }),
});

export const {
  useGetProjectBoardsByIdQuery,
} = boardApiSlice;
