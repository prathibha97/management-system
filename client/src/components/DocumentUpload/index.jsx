/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

function DocumentUpload({ handleChange, values, nextStep, prevStep }) {
  const handleNextStep = (e) => {
    e.preventDefault()
    console.log(values.idCardPath, values.bankPassPath, values.resumePath)
    nextStep()
  }
  const handlePrevStep = (e) => {
    e.preventDefault()
    prevStep()
  }
  return (
    <div className='bg-[#EEF2F5] h-[90%] w-[95%] rounded-xl m-auto'>
      <div className='flex flex-col mt-6 ml-[55px]'>
        <h1 className='text-2xl font-bold mt-6'>Upload Documents</h1>
        <p className='text-[#707070] text-sm'>Here you can upload documents of employee</p>
      </div>
      <div className='flex bg-white px-12 py-5 mt-5 justify-between items-center w-[90%] m-auto rounded-2xl'>
        <div className='flex flex-wrap justify-between gap-8'>
          <div className='flex flex-col w-[45%]'>
            <label>NIC</label>
            <input
              type='file'
              className='border rounde'
              accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
              onChange={handleChange('idCardPath')}
              defaultValue={values.idCardPath} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <label>Bank Passbook</label>
            <input
              type='file'
              className='border rounded'
              accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
              onChange={handleChange('bankPassPath')}
              defaultValue={values.bankPassPath} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <label>Resume</label>
            <input
              type='file'
              className='border rounded'
              accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
              onChange={handleChange('resumePath')}
              defaultValue={values.resumePath} />
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

export default DocumentUpload