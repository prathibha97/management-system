import { createSlice } from '@reduxjs/toolkit';

const departmentSlice = createSlice({
  name: 'departments',
  initialState: {
    department:{},
    departments: [],
  },
  reducers: {
    getDepartments: (state, action) => {
      const { departments} = action.payload;
      state.departments = departments;
    },
  },
});

export const { getDepartments } = departmentSlice.actions;
export default departmentSlice.reducer;
