import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
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
  },
});

export const { setProjects, setCreateProject, setDeleteProject } =
  projectSlice.actions;
export default projectSlice.reducer;
