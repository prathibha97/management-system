import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employee: {},
    employees: [],
  },
  reducers: {
    setEmployeeList: (state, action) => {
      const { employees } = action.payload;
      state.employees = employees;
    },
    setEmployeeProfile: (state, action) => {
      const { employee } = action.payload;
      state.employee = employee;
    },
  },
});

export const { setEmployeeList, setEmployeeProfile } = employeeSlice.actions;
export default employeeSlice.reducer;
