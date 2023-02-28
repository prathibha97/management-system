import { Alert, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerEmployee } from '../../redux/actions/employeeActions';
import Loader from '../Loader';

function ReviewNewEmployee({ prevStep, values }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const { error, loading } = useSelector((state) => state.registerEmployee);

  const { firstName,
    lastName,
    birthDate,
    email,
    password,
    phone,
    gender,
    nic,
    street,
    city,
    state,
    zip,
    empNo,
    designation,
    workType,
    department,
    employementHistoty,
    projectHistory,
    leaveBalance,
    isAdmin,
    idCardPath,
    bankPassPath,
    resumePath, } = values

  const saveEmployee = () => {
    try {
      dispatch(registerEmployee(firstName,
        lastName,
        birthDate,
        email,
        password,
        phone,
        gender,
        nic,
        street,
        city,
        state,
        zip,
        empNo,
        designation,
        workType,
        department,
        employementHistoty,
        projectHistory,
        leaveBalance,
        isAdmin,
        idCardPath,
        bankPassPath,
        resumePath,))
      navigate('/people')
      setAlert({ open: true, message: 'Employee Added Successfully', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' });
    }

  }
  const handlePrevStep = (e) => {
    e.preventDefault()
    prevStep()
  }

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  useEffect(() => {
    if (error) {
      setAlert({ open: true, message: error, severity: 'error' });
    }
  }, [error]);

  if (loading) return <Loader />

  return (
    <div className='bg-[#EEF2F5] h-[90%] w-[95%] rounded-xl m-auto'>
      <div className='flex flex-col mt-6 ml-[55px]'>
        <h1 className='text-2xl font-bold mt-6'>Review Employee Details</h1>
        <p className='text-[#707070] text-sm'>Make user employee details are accurate before saving</p>
      </div>
      <div className='flex bg-white px-12 py-5 mt-5 justify-between items-center w-[90%] m-auto rounded-2xl'>
        <div className='flex flex-wrap justify-between gap-8'>
          <p>review</p>
        </div>
      </div>
      <div className='flex justify-end py-10 gap-6 mr-[55px]'>
        <button type='button' className='bg-white text-[#707070] py-2 px-5 rounded' onClick={handlePrevStep}>Back</button>
        <button type='button' className='bg-[#1DB3AB] text-white py-2 px-5 rounded' onClick={saveEmployee}>Save</button>
      </div>
      <Snackbar open={alert?.open} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert?.severity}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ReviewNewEmployee