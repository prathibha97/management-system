import { createSlice } from '@reduxjs/toolkit';

const departmentSlice = createSlice({
  name: 'departments',
  initialState: {
    department: {},
    departments: [],
    departmentEmployeeList: [],
  },
  reducers: {
    getDepartments: (state, action) => {
      const { departments } = action.payload;
      state.departments = departments;
    },
    departmentEmployeeList: (state, action) => {
      const { departmentId, employeeList } = action.payload;
      const department = state.departments?.find((d) => d.id === departmentId);
      if (department) {
        state.department = department;
        state.departmentEmployeeList = employeeList;
      }
    },
  },
});

export const { getDepartments, departmentEmployeeList } = departmentSlice.actions;
export default departmentSlice.reducer;
