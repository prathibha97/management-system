/* eslint-disable jsx-a11y/label-has-associated-control */
import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getDepartmentDetails } from '../../redux/actions/departmentActions'

function SalaryStructure({ handleChange, values, nextStep, prevStep }) {
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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(getDepartmentDetails())
      }
    }
  }, [userInfo])

  return (
    <div className='bg-[#EEF2F5] h-[90%] w-[95%] rounded-xl m-auto'>
      <div className='flex flex-col mt-6 ml-[55px]'>
        <h1 className='text-2xl font-bold mt-6'>Salary Details</h1>
        <p className='text-[#707070] text-sm'>Here you can add the salary details of employee</p>
      </div>
      <div className='flex bg-white px-12 py-5 mt-5 justify-between items-center w-[90%] m-auto rounded-2xl'>
        <div className='flex flex-wrap justify-between gap-2'>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="effective-date-lable">
              Effective Date
            </InputLabel>
            <TextField
              type='date'
              className='border rounded'
              onChange={handleChange('effectiveDate')}
              defaultValue={values.effectiveDate} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="payment-model-lable">
              Payment Model
            </InputLabel>
            <Select labelid="payment-model-lable" id="payment-model-lable" onChange={handleChange('paymentModel')} defaultValue={values.paymentModel}>
              <MenuItem value='Monthly'>Monthly</MenuItem>
              <MenuItem value='Annual'>Annual</MenuItem>
            </Select>
          </div>
          {/* <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="basic-lable">
              Basic Salary
            </InputLabel>
            <TextField
              className='border rounded'
              onChange={handleChange('basicSalary')}
              defaultValue={values.basicSalary} />
          </div> */}
          {/* <div className='flex flex-col w-[45%]'>
            <FormLabel id="demo-row-radio-buttons-group-label">P.F</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleChange('pf')}
              defaultValue={values.pf}
            >
              <FormControlLabel value control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </div> */}
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="bank-lable">
              Bank Name
            </InputLabel>
            <TextField
              className='border rounded'
              onChange={handleChange('bank')}
              defaultValue={values.bank} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="accNo-lable">
              Account Number
            </InputLabel>
            <TextField
              className='border rounded'
              onChange={handleChange('accNo')}
              defaultValue={values.accNo} />
          </div>
          {/* <div className='flex flex-col w-[45%]'>
            <FormLabel id="demo-row-radio-buttons-group-label">Salary Advance</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleChange('advance')}
              defaultValue={values.advance}
            >
              <FormControlLabel value control={<Radio />} label="Allowed" />
              <FormControlLabel value={false} control={<Radio />} label="Not Allowed" />
            </RadioGroup>
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="max-advance-lable">
              Max Advance Amount
            </InputLabel>
            <TextField
              className='border rounded'
              onChange={handleChange('maxAdvance')}
              defaultValue={values.maxAdvance} />
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="noOfAdvances-lable">
              No of Advances
            </InputLabel>
            <TextField
              className='border rounded'
              onChange={handleChange('noOfAdvances')}
              defaultValue={values.noOfAdvances} />
          </div> */}
        </div>
      </div>
      <div className='flex justify-end py-10 gap-6 mr-[55px]'>
        <button type='button' className='bg-white text-[#707070] py-2 px-5 rounded' onClick={handlePrevStep}>Back</button>
        <button type='button' className='bg-[#1DB3AB] text-white py-2 px-5 rounded' onClick={handleNextStep}>Continue</button>
      </div>
    </div>
  )
}

export default SalaryStructure