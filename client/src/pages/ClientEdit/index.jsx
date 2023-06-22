/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { InputLabel, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEditClientMutation, useGetClientsQuery } from '../../app/features/clients/clientApiSlice';
import { selectClient } from '../../app/features/clients/clientSelectors';
import { setEditClient } from '../../app/features/clients/clientSlice';
import { Loader } from '../../components';

function ClientEdit() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleCancel = () => {
    navigate('/clients')
  }

  const { refetch: refetchClientList } = useGetClientsQuery()

  const [editClient, { isLoading: isEditClientLoading }] = useEditClientMutation()

  const client = useSelector(selectClient)

  const [first, setFirst] = useState(client.name.first)
  const [last, setLast] = useState(client.name.last)
  const [email, setEmail] = useState(client.email)
  const [phone, setPhone] = useState(client.phone)
  const [street, setStreet] = useState(client.address.street)
  const [city, setCity] = useState(client.address.city)
  const [state, setState] = useState(client.address.state)
  const [zip, setZip] = useState(client.address.zip)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const clientData = {
      id: client._id,
      first,
      last,
      email,
      phone,
      street,
      city,
      state,
      zip
    };
    try {
      const clientInfo = await editClient({ id: client._id, client: clientData }).unwrap()
      dispatch(setEditClient({ client: clientInfo }))
      refetchClientList()
      navigate('/clients')
    } catch (err) {
      console.log(err);
    }
  }

  if (isEditClientLoading) return <Loader />

  return (
    <div className='bg-[#EEF2F5] h-[90%] w-[95%] mt-6 rounded-xl m-auto overflow-y-auto'>
      <div className='flex flex-col mt-1 ml-[55px]'>
        <h1 className='text-2xl font-bold mt-4'>Edit Client Infomation</h1>
        <p className='text-[#707070] text-sm'>Here you can edit client information</p>
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

export default ClientEdit