import { apiSlice } from '../../api/apiSlice';

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (task) => ({
        url: `/tasks`,
        method: 'POST',
        body: task,
      }),
    }),
    updateTaskBoard: builder.mutation({
      query: ({ id, boardId }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: { boardId },
      }),
    }),
    deleteTask: builder.mutation({
      query: ({ taskId }) => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE',
      }),
    }),
    getTasksByProjectId: builder.query({
      query: ({id}) => ({
        url: `/tasks/project/${id}`,
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useUpdateTaskBoardMutation,
  useDeleteTaskMutation,
  useGetTasksByProjectIdQuery,
} = taskApiSlice;
