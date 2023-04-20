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
  },
});

export const { setProjects } = projectSlice.actions;
export default projectSlice.reducer;
