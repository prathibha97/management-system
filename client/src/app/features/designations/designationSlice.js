import { createSlice } from '@reduxjs/toolkit';

const designationSlice = createSlice({
  name: 'designations',
  initialState: {
    designation: {},
    designations: [],
  },
  reducers: {
    getDesignations: (state, action) => {
      const { designations } = action.payload;
      state.getDesignations = designations;
    },
  },
});

export const { getDepartments } = designationSlice.actions;
export default designationSlice.reducer;
