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
  },
});

export const { setEmployeeList } = employeeSlice.actions;
export default employeeSlice.reducer;
