/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

function ProfessionalInfoForm({ handleChange, values, nextStep, prevStep }) {
  const handleNextStep = (e) => {
    e.preventDefault()
    nextStep()
  }
  const handlePrevStep = (e) => {
    e.preventDefault()
    prevStep()
  }
  return (
    <div className='bg-[#EEF2F5] h-[90%] w-[95%] rounded-xl m-auto'>
      <div className='flex flex-col mt-6 ml-[55px]'>
        <h1 className='text-2xl font-bold mt-6'>Professional Infomation</h1>
        <p className='text-[#707070] text-sm'>Here you can Add professional information of employee</p>
      </div>
      <div className='flex bg-white px-12 py-5 mt-5 justify-between items-center w-[90%] m-auto rounded-2xl'>
        <div className='flex flex-wrap justify-between gap-8'>
          <div className='flex flex-col w-[45%]'>
            <label>Employee Number</label>
            <input
              className='border rounded'
              onChange={handleChange('firstName')}
              defaultValue={values.firstName} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <label>Designation</label>
            <input
              className='border rounded'
              onChange={handleChange('lastName')}
              defaultValue={values.lastName} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <label>Work Type</label>
            <input
              className='border rounded'
              onChange={handleChange('dob')}
              defaultValue={values.dob} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <label>Department</label>
            <input
              className='border rounded'
              onChange={handleChange('email')}
              defaultValue={values.email} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <label>Work Type</label>
            <input
              className='border rounded'
              onChange={handleChange('phone')}
              defaultValue={values.phone} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <label>Leave Allocation</label>
            <input
              className='border rounded'
              onChange={handleChange('gender')}
              defaultValue={values.gender} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <label>Admin</label>
            <input
              className='border rounded'
              onChange={handleChange('nic')}
              defaultValue={values.nic} />
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