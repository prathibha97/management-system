/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { InputLabel, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateClientMutation } from '../../app/features/clients/clientApiSlice';
import { setCreateClient } from '../../app/features/clients/clientSlice';
import { Loader } from '../../components';

function ClientRegister() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleCancel = () => {
    navigate('/clients')
  }

  const [createClient, { isLoading: isCreateClientLoading }] = useCreateClientMutation()

  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const clientData = await createClient({ first, last, email, phone, street, city, state, zip }).unwrap()
      dispatch(setCreateClient({ client: clientData }))
      navigate('/clients')
    } catch (err) {
      console.log(err);
    }
  }

  if (isCreateClientLoading) return <Loader />

  return (
    <div className='bg-[#EEF2F5] h-[90%] w-[95%] mt-6 rounded-xl m-auto overflow-y-auto'>
      <div className='flex flex-col mt-1 ml-[55px]'>
        <h1 className='text-2xl font-bold mt-4'>Client Infomation</h1>
        <p className='text-[#707070] text-sm'>Here you can Add client information of employee</p>
      </div>
      <div className='flex bg-white px-12 py-5 mt-5 justify-between items-center w-[90%] m-auto rounded-2xl'>
        <div className='flex flex-wrap justify-between gap-1'>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              First Name
            </InputLabel>
            <TextField
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              Last Name
            </InputLabel>
            <TextField
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
          </div>
          {/* <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              Birth Date
            </InputLabel>
            <TextField
            />
          </div> */}
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              Email
            </InputLabel>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              Phone
            </InputLabel>
            <TextField
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {/* <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="gender-lable">
              Gender
            </InputLabel>
            <Select labelid="gender-lable" id="gender-lable" >
              <MenuItem value='Male'>Male</MenuItem>
              <MenuItem value='Female'>Female</MenuItem>
              <MenuItem value='Other'>Other</MenuItem>
            </Select>
          </div> */}
          <div className='flex flex-col w-[100%]'>
            <InputLabel
              labelid="address-lable">
              Address
            </InputLabel>
            <div className='flex flex-wrap justify-between w-[100%] gap-10'>
              <TextField
                sx={{ width: '45%' }}
                placeholder='Street'
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <TextField
                sx={{ width: '45%' }}
                placeholder='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                sx={{ width: '45%' }}
                placeholder='State'
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <TextField
                sx={{ width: '45%' }}
                placeholder='Zip Code'
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end py-5 gap-6 mr-[55px]'>
        <button type='button' className='bg-white text-[#707070] py-2 px-5 rounded' onClick={handleCancel}>Cancel</button>
        <button type='button' className='bg-[#1DB3AB] text-white py-2 px-5 rounded' onClick={handleSubmit}>Save</button>
      </div>
    </div>
  )
}

export default ClientRegister