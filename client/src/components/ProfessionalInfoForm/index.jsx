/* eslint-disable jsx-a11y/label-has-associated-control */
import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCurrentUser } from '../../app/features/auth/authSelectors'
import { useGetDepartmentsQuery } from '../../app/features/departments/departmentApiSlice'
import { getDepartments } from '../../app/features/departments/departmentSlice'
import { useGetDesignationsQuery } from '../../app/features/designations/designationApiSlice'

function ProfessionalInfoForm({ handleChange, values, nextStep, prevStep }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleNextStep = (e) => {
    e.preventDefault()
    nextStep()
  }
  const handlePrevStep = (e) => {
    e.preventDefault()
    prevStep()
  }

  const userInfo = useSelector(selectCurrentUser);

  const { data: departments } = useGetDepartmentsQuery()
  const { data: designations } = useGetDesignationsQuery()

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(getDepartments({ departments }))
        dispatch(getDepartments({ designations }))
      }
    }
  }, [userInfo])


  return (
    <div className='bg-[#EEF2F5] h-[90%] w-[95%] rounded-xl m-auto'>
      <div className='flex flex-col mt-6 ml-[55px]'>
        <h1 className='text-2xl font-bold mt-6'>Professional Infomation</h1>
        <p className='text-[#707070] text-sm'>Here you can Add professional information of employee</p>
      </div>
      <div className='flex bg-white px-12 py-5 mt-5 justify-between items-center w-[90%] m-auto rounded-2xl'>
        <div className='flex flex-wrap justify-between gap-8'>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              Employee Number
            </InputLabel>
            <TextField
              className='border rounded'
              onChange={handleChange('empNo')}
              defaultValue={values.empNo} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              Date of Appointment
            </InputLabel>
            <TextField
              type='date'
              className='border rounded'
              onChange={handleChange('dateOfAppointment')}
              defaultValue={values.dateOfAppointment} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="designation-lable">
              Designation
            </InputLabel>
            <Select labelid="designation-lable" id="designation-lable" onChange={handleChange('designation')} defaultValue={values.designation}>
              {designations?.map((designation) => (
                <MenuItem key={designation?._id} value={designation?._id}>{designation?.name}</MenuItem>
              ))}
            </Select>
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="work-type-lable">
              Work Type
            </InputLabel>
            <Select labelid="work-type-lable" id="work-type-lable" onChange={handleChange('workType')} defaultValue={values.workType}>
              <MenuItem value='Intern'>Intern</MenuItem>
              <MenuItem value='Contract'>Contract</MenuItem>
              <MenuItem value='Part-Time'>Part-Time</MenuItem>
              <MenuItem value='Full-Time'>Full-Time</MenuItem>
            </Select>
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="department-type-lable">
              Department
            </InputLabel>
            <Select labelid="department-type-lable" id="department-type-lable" onChange={handleChange('department')} defaultValue={values.department}>
              {departments?.map((department) => (
                <MenuItem key={department._id} value={department._id}>{department.name}</MenuItem>
              ))}
            </Select>
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="work-type-lable">
              Leave Allocation
            </InputLabel>
            <Select labelid="leave-type-lable" id="leave-type-lable" onChange={handleChange('leaveAllocation')} defaultValue={values.leaveAllocation} multiple>
              <MenuItem value='Casual'>
                Casual
              </MenuItem>
              <MenuItem value='Annual'>
                Annual
              </MenuItem>
              <MenuItem value='Maternity'>
                Maternity
              </MenuItem>
              <MenuItem value='Medical'>
                Medical
              </MenuItem>
            </Select>
          </div>

          <div className='flex items-center gap-5'>
            <InputLabel
              labelid="user-type-lable">
              User Type
            </InputLabel>
            <Select labelid="work-type-lable" id="work-type-lable" onChange={handleChange('role')} defaultValue={values.role}>
              <MenuItem value='Admin'>Admin</MenuItem>
              <MenuItem value='Manager'>Manager</MenuItem>
              <MenuItem value='HR'>HR</MenuItem>
              <MenuItem value='Employee'>Employee</MenuItem>
              <MenuItem value='3rd Party'>3rd Party</MenuItem>
            </Select>
          </div>
        </div>
      </div>
      <div className='flex justify-end py-10 gap-6 mr-[55px]'>
        <button type='button' className='bg-white text-[#707070] py-2 px-5 rounded' onClick={handlePrevStep}>Back</button>
        <button type='button' className='bg-[#1DB3AB] text-white py-2 px-5 rounded' onClick={handleNextStep}>Continue</button>
      </div>
    </div>
  )
}

export default ProfessionalInfoForm