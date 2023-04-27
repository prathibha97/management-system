import { apiSlice } from '../../api/apiSlice';

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => ({
        url: `/projects`,
      }),
    }),
    createProject: builder.mutation({
      query: (project) => ({
        url: `/projects`,
        method: 'POST',
        body: { ...project },
      }),
    }),
    getProjectById: builder.query({
      query: (id) => ({
        url: `/projects/${id}`,
      }),
    }),
    deleteProject: builder.mutation({
      query: ({id}) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      })
    }),
    getEmployeeProjects: builder.query({
      query: () => ({
        url: `/projects/emp`,
      })
    })
  }),
});

export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useGetProjectByIdQuery,
  useDeleteProjectMutation,
  useGetEmployeeProjectsQuery
} = projectApiSlice;
