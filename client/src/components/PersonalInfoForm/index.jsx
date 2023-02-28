/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div className='bg-[#EEF2F5] h-[90%] w-[95%] rounded-xl m-auto'>
      <div className='flex flex-col mt-6 ml-[55px]'>
        <h1 className='text-2xl font-bold mt-6'>Personal Infomation</h1>
        <p className='text-[#707070] text-sm'>Here you can Add personal information of employee</p>
      </div>
      <div className='flex bg-white px-12 py-5 mt-5 justify-between items-center w-[90%] m-auto rounded-2xl'>
        <div className='flex flex-wrap justify-between gap-6'>
          <div className='flex flex-col w-[45%]'>
            <label>First Name</label>
            <input
              className='border rounded'
              onChange={handleChange('firstName')}
              defaultValue={values.firstName} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <label>Last Name</label>
            <input
              className='border rounded'
              onChange={handleChange('lastName')}
              defaultValue={values.lastName} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <label>DOB</label>
            <input
              className='border rounded'
              onChange={handleChange('dob')}
              defaultValue={values.dob} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <label>Email</label>
            <input
              className='border rounded'
              onChange={handleChange('email')}
              defaultValue={values.email} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <label>Phone</label>
            <input
              className='border rounded'
              onChange={handleChange('phone')}
              defaultValue={values.phone} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <label>Gender</label>
            <input
              className='border rounded'
              onChange={handleChange('gender')}
              defaultValue={values.gender} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <label>NIC Number</label>
            <input
              className='border rounded'
              onChange={handleChange('nic')}
              defaultValue={values.nic} />
          </div>
          <div className='flex flex-col w-[100%]'>
            <label>Address</label>
            <div className='flex flex-wrap justify-between w-[100%] gap-10'>
              <input
                className='border w-[45%] rounded'
                placeholder='Street'
                onChange={handleChange('street')}
                defaultValue={values.street}
              />
              <input
                className='border w-[45%] rounded'
                placeholder='City'
                onChange={handleChange('city')}
                defaultValue={values.city}
              />
              <input
                className='border w-[45%] rounded'
                placeholder='State'
                onChange={handleChange('state')}
                defaultValue={values.state}
              />
              <input
                className='border w-[45%] rounded'
                placeholder='Zip'
                onChange={handleChange('zip')}
                defaultValue={values.zip}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end py-10 gap-6 mr-[55px]'>
        <button type='button' className='bg-white text-[#707070] py-2 px-5 rounded' onClick={handleCancel}>Cancel</button>
        <button type='button' className='bg-[#1DB3AB] text-white py-2 px-5 rounded' onClick={handleNextStep}>Continue</button>
      </div>
    </div>
  )
}

export default PersonalInfoForm