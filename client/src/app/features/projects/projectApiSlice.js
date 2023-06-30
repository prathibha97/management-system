import FormData from 'form-data';
import { apiSlice } from '../../api/apiSlice';

const createFormData = (project) => {
  const formData = new FormData();
  formData.append('projectScope', project.projectScope);
  formData.append('title', project.title);
  formData.append('client', project.client);
  formData.append('department', project.department);
  formData.append('category', project.category);
  formData.append('deadline', project.deadline);
  formData.append('team', project.team);
  formData.append('designLink', project.designLink);
  formData.append('specialNotes', project.specialNotes);
  formData.append('nftBaseDesignCount', project.nftBaseDesignCount);
  formData.append('nftTradeCount', project.nftTradeCount);
  formData.append('nftCollectionSize', project.nftCollectionSize);
  return formData;
};

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
        body: createFormData(project),
      }),
    }),

    getProjectById: builder.query({
      query: (id) => ({
        url: `/projects/${id}`,
      }),
    }),

    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
    }),

    getEmployeeProjects: builder.query({
      query: () => ({
        url: `/projects/emp`,
      }),
    }),

    editProject: builder.mutation({
      query: ({ id, project }) => ({
        url: `/projects/${id}`,
        method: 'PUT',
        body: createFormData(project),
      }),
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useGetProjectByIdQuery,
  useDeleteProjectMutation,
  useGetEmployeeProjectsQuery,
  useEditProjectMutation,
} = projectApiSlice;
