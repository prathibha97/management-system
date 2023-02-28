/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function PersonalInfoForm({ handleChange, values, nextStep }) {
  const navigate = useNavigate()
  const handleNextStep = (e) => {
    e.preventDefault()
    nextStep()
  }
  const handleCancel = () => {
    navigate('/people')
  }
  return (
    <div className='bg-[#EEF2F5] h-[90%] w-[95%] mt-6 rounded-xl m-auto overflow-y-auto'>
      <div className='flex flex-col mt-1 ml-[55px]'>
        <h1 className='text-2xl font-bold mt-4'>Personal Infomation</h1>
        <p className='text-[#707070] text-sm'>Here you can Add personal information of employee</p>
      </div>
      <div className='flex bg-white px-12 py-5 mt-5 justify-between items-center w-[90%] m-auto rounded-2xl'>
        <div className='flex flex-wrap justify-between gap-1'>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              First Name
            </InputLabel>
            <TextField
              onChange={handleChange('firstName')}
              defaultValue={values.firstName} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              Last Name
            </InputLabel>
            <TextField
              onChange={handleChange('lastName')}
              defaultValue={values.lastName} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              Birth Date
            </InputLabel>
            <TextField
              type='date'
              onChange={handleChange('dob')}
              defaultValue={values.birthDate} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              Email
            </InputLabel>
            <TextField
              type='email'
              onChange={handleChange('email')}
              defaultValue={values.email} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              Password
            </InputLabel>
            <TextField
              type='password'
              onChange={handleChange('password')}
              defaultValue={values.password} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              Phone
            </InputLabel>
            <TextField
              onChange={handleChange('phone')}
              defaultValue={values.phone} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="gender-lable">
              Gender
            </InputLabel>
            <Select labelid="gender-lable" id="gender-lable" onChange={handleChange('gender')} defaultValue={values.gender}>
              <MenuItem value='Male'>Male</MenuItem>
              <MenuItem value='Female'>Female</MenuItem>
              <MenuItem value='Other'>Other</MenuItem>
            </Select>
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              NIC Number
            </InputLabel>
            <TextField
              onChange={handleChange('nic')}
              defaultValue={values.nic} />
          </div>
          <div className='flex flex-col w-[100%]'>
            <InputLabel
              labelid="address-lable">
              Address
            </InputLabel>
            <div className='flex flex-wrap justify-between w-[100%] gap-10'>
              <TextField
                sx={{ width: '45%' }}
                placeholder='Street'
                onChange={handleChange('street')}
                defaultValue={values.street} />
              <TextField
                sx={{ width: '45%' }}
                placeholder='City'
                onChange={handleChange('city')}
                defaultValue={values.city} />
              <TextField
                sx={{ width: '45%' }}
                placeholder='State'
                onChange={handleChange('state')}
                defaultValue={values.state} />
              <TextField
                sx={{ width: '45%' }}
                placeholder='Zip Code'
                onChange={handleChange('zip')}
                defaultValue={values.zip} />
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end py-5 gap-6 mr-[55px]'>
        <button type='button' className='bg-white text-[#707070] py-2 px-5 rounded' onClick={handleCancel}>Cancel</button>
        <button type='button' className='bg-[#1DB3AB] text-white py-2 px-5 rounded' onClick={handleNextStep}>Continue</button>
      </div>
    </div>
  )
}

export default PersonalInfoForm