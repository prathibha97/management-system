/* eslint-disable no-restricted-syntax */
import FormData from 'form-data';
import { apiSlice } from '../../api/apiSlice';

const createFormData = (employee) => {
  const formData = new FormData();
  Object.entries(employee).forEach(([key, value]) => {
    if (
      key === 'idCardPath' ||
      key === 'bankPassPath' ||
      key === 'resumePath'
    ) {
      formData.append(key, value, value.name);
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    employeeList: builder.query({
      query: () => ({
        url: `/emp`,
      }),
    }),
    employeeProfile: builder.query({
      query: (empNo) => ({
        url: `/emp/profile/${empNo}`,
      }),
    }),
    removeEmployee: builder.mutation({
      query: ({ id }) => ({
        url: `/emp/${id}`,
        method: 'DELETE',
      }),
    }),
    employeeDetailsAdmin: builder.query({
      query: (empNo) => ({
        url: `/emp/${empNo}`,
      }),
    }),
    // registerEmployee: builder.mutation({
    //   query: (employee) => {
    //     const formData = new FormData();
    //     formData.append('firstName', employee.firstName);
    //     formData.append('lastName', employee.lastName);
    //     formData.append('birthDate', employee.birthDate);
    //     formData.append('email', employee.email);
    //     formData.append('password', employee.password);
    //     formData.append('phone', employee.phone);
    //     formData.append('gender', employee.gender);
    //     formData.append('nic', employee.nic);
    //     formData.append('street', employee.street);
    //     formData.append('city', employee.city);
    //     formData.append('state', employee.state);
    //     formData.append('zip', employee.zip);
    //     formData.append('empNo', employee.empNo);
    //     formData.append('designation', employee.designation);
    //     formData.append('workType', employee.workType);
    //     formData.append('department', employee.department);
    //     formData.append('employmentHistory', employee.employmentHistory);
    //     formData.append('projectHistory', employee.projectHistory);
    //     formData.append('leaveAllocation', employee.leaveAllocation);
    //     formData.append('isAdmin', employee.isAdmin);
    //     formData.append('idCardPath', employee.idCardPath);
    //     formData.append('bankPassPath', employee.bankPassPath);
    //     formData.append('resumePath', employee.resumePath);
    //     formData.append('dateOfAppointment', employee.dateOfAppointment);
    //     formData.append('effectiveDate', employee.effectiveDate);
    //     formData.append('paymentModel', employee.paymentModel);
    //     formData.append('bank', employee.bank);
    //     formData.append('accNo', employee.accNo);

    //     return {
    //       url: `/emp/register`,
    //       method: 'POST',
    //       body: formData,
    //     };
    //   },
    // }),
    registerEmployee: builder.mutation({
      query: (employee) => ({
        url: `/emp/auth/register`,
        method: 'POST',
        body: createFormData(employee),
      }),
    }),
  }),
});

export const {
  useEmployeeListQuery,
  useEmployeeProfileQuery,
  useRemoveEmployeeMutation,
  useEmployeeDetailsAdminQuery,
  useRegisterEmployeeMutation,
} = employeeApiSlice;
