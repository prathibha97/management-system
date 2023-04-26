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
    setRemoveEmployee: (state, action) => {
      const { employeeId } = action.payload;
      state.employees = state.employees.filter(
        (employee) => employee.empNo !== employeeId
      );
    },
    setEmployeeDetailsAdmin: (state, action) => {
      const { employee } = action.payload;
      state.employee = employee;
    }
  },
});

export const {
  setEmployeeList,
  setEmployeeProfile,
  setRemoveEmployee,
  setEmployeeDetailsAdmin,
} = employeeSlice.actions;
export default employeeSlice.reducer;
