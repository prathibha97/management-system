import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    project: {},
    projects: [],
  },
  reducers: {
    setProjects: (state, action) => {
      const { projects } = action.payload;
      state.projects = projects;
    },
    setCreateProject: (state, action) => {
      const { project } = action.payload;
      state.projects.push(project);
    },
    setDeleteProject: (state, action) => {
      const { project } = action.payload;
      state.projects = state.projects.filter((p) => p.id !== project._id);
    },
    setSelectedProject: (state, action) => {
      const { project } = action.payload;
      state.project = project;
    },
    setEditProject: (state, action) => {
      const { project } = action.payload;
      const index = state.projects.findIndex(
        (prjct) => prjct._id === project._id
      );
      if (index !== -1) {
        const updatedProjects = [...state.projects]; // Create a copy of the projects array
        updatedProjects[index] = project; // Update the specific project object
        state.employees = updatedProjects; // Update the state with the new array
      }
    },
    resetProjects: (state) => {
      state.projects = [];
      state.project = {};
      state.employees = [];
    },
  },
});

export const {
  setProjects,
  setCreateProject,
  setDeleteProject,
  setSelectedProject,
  setEditProject,
  resetProjects,
} = projectSlice.actions;
export default projectSlice.reducer;
