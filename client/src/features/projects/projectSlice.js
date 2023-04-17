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

export const { setCredentials, setLogout } = projectSlice.actions;
export default projectSlice.reducer;
