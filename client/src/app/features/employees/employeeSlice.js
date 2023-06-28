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
    setSelectEmployee: (state, action) => {
      const { employee } = action.payload;
      state.employee = employee;
    },
    setRemoveEmployee: (state, action) => {
      const { id } = action.payload;
      state.employees = state.employees.filter(
        (employee) => employee.empNo !== id
      );
    },
    setEmployeeDetailsAdmin: (state, action) => {
      const { employee } = action.payload;
      state.employee = employee;
    },
    setRegisterEmployee: (state, action) => {
      const { employee } = action.payload;
      state.employees.push(employee);
    },
    setEditEmployee: (state, action) => {
      const { employee } = action.payload;
      const index = state.employees.findIndex(
        (emp) => emp.empNo === employee.empNo
      );
      if (index !== -1) {
        const updatedEmployees = [...state.employees]; // Create a copy of the employees array
        updatedEmployees[index] = employee; // Update the specific employee object
        state.employees = updatedEmployees; // Update the state with the new array
      }
    },
  },
});

export const {
  setEmployeeList,
  setEmployeeProfile,
  setSelectEmployee,
  setRemoveEmployee,
  setEmployeeDetailsAdmin,
  setRegisterEmployee,
  setEditEmployee,
} = employeeSlice.actions;
export default employeeSlice.reducer;
