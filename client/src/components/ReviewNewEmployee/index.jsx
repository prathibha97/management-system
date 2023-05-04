/* eslint-disable object-shorthand */
import { faBriefcase, faBuilding, faEnvelope, faGift, faHouse, faHouseLaptop, faIdCard, faLock, faMars, faRightFromBracket, faScrewdriverWrench, faUser, faVenus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRegisterEmployeeMutation } from '../../app/features/employees/employeeApiSlice';
import { setRegisterEmployee } from '../../app/features/employees/employeeSlice';
import Loader from '../Loader';

function ReviewNewEmployee({ prevStep, values }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const [registerEmployee, { error, isLoading }] = useRegisterEmployeeMutation()

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
    leaveAllocation,
    isAdmin,
    idCardPath,
    bankPassPath,
    resumePath,
    dateOfAppointment,
    effectiveDate,
    paymentModel,
    bank,
    accNo,
  } = values

  console.log(values);

  const saveEmployee = async () => {
    try {
      const employee = await registerEmployee({
        firstName,
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
        leaveAllocation,
        isAdmin,
        idCardPath,
        bankPassPath,
        resumePath,
        dateOfAppointment,
        effectiveDate,
        paymentModel,
        bank,
        accNo,
      }).unwrap()
      dispatch(setRegisterEmployee({ employee }))
      navigate('/people')
      setAlert({ open: true, message: 'Employee Added Successfully', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: error?.data?.message, severity: 'error' });
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
      setAlert({ open: true, message: error?.data?.message, severity: 'error' });
    }
  }, [error]);

  if (isLoading) return <Loader />

  const birthdateString = birthDate;
  const birthdate = new Date(birthdateString);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const formattedDate = birthdate.toLocaleDateString('en-US', options);

  const personalInfo = [
    {
      id: 1,
      icon: faUser,
      title: `${firstName} ${lastName}`,
      subtitle: 'Name',
    },
    {
      id: 2,
      icon: faEnvelope,
      title: email,
      subtitle: 'Email',
    },
    {
      id: 3,
      icon: faGift,
      title: formattedDate,
      subtitle: 'Birthday',
    },
    {
      id: 4,
      icon: faMars,
      iconFemale: faVenus,
      title: gender,
      titleFemale: 'Female',
      subtitle: 'Gender',
    },
    {
      id: 5,
      icon: faIdCard,
      title: nic,
      subtitle: 'NIC',
    },
    {
      id: 6,
      icon: faLock,
      title: password,
      subtitle: 'Password',
    },
    {
      id: 7,
      icon: faHouse,
      title: `${street}, ${city}, ${state}, ${zip}`,
      subtitle: 'Address',
    },
  ];

  const workInfo = [
    {
      id: 1,
      icon: faUser,
      title: empNo,
      subtitle: 'Employee Number',
    },
    {
      id: 2,
      icon: faBriefcase,
      title: dateOfAppointment,
      subtitle: 'Date of Appointment',
    },
    {
      id: 3,
      icon: faBriefcase,
      title: designation,
      subtitle: 'Designation',
    },
    {
      id: 4,
      icon: faHouseLaptop,
      title: workType,
      subtitle: 'Work Type',
    },
    {
      id: 5,
      icon: faBuilding,
      title: department,
      subtitle: 'Department',
    },
    {
      id: 6,
      icon: faRightFromBracket,
      title: leaveAllocation,
      subtitle: 'Leave Allocation',
    },
    {
      id: 7,
      icon: faScrewdriverWrench,
      title: isAdmin === true ? 'Admin' : 'Employee',
      subtitle: 'Employee Status',
    },
  ]

  const salaryInfo = [
    {
      id: 1,
      icon: faUser,
      title: effectiveDate,
      subtitle: 'Effective Date',
    },
    {
      id: 2,
      icon: faBriefcase,
      title: paymentModel,
      subtitle: 'Payment Model',
    },
    {
      id: 3,
      icon: faRightFromBracket,
      title: bank,
      subtitle: 'Bank Name',
    },
    {
      id: 4,
      icon: faRightFromBracket,
      title: accNo,
      subtitle: 'Bank Account Number',
    },
  ]

  return (
    <div className='bg-[#EEF2F5] mt-6 h-[95%] w-[95%] rounded-xl m-auto'>
      <div className='flex flex-col mt-3 ml-[55px]'>
        <h1 className='text-2xl font-bold mt-2'>Review Employee Details</h1>
        <p className='text-[#707070] text-sm'>Make user employee details are accurate before saving</p>
      </div>
      <h1 className='text-lg font-semibold mt-3 ml-[55px]'>Personal Infomation</h1>
      <div className='flex bg-white px-12 py-5 mt-5 justify-between items-center w-[90%] m-auto rounded-2xl'>
        <div className='flex flex-wrap justify-between gap-8'>
          {personalInfo.map((emp) => (
            <div
              key={emp.id}
              className="flex items-center mb-5 gap-4"
            >
              {emp.subtitle === 'Gender' && (
                <div className='flex items-center gap-5 mr-[75px]'>
                  <FontAwesomeIcon
                    icon={emp.title === 'Male' ? emp.icon : emp.iconFemale}
                    className='text-[#707070]'
                  />
                  <div className='flex flex-col'>
                    <h2>{emp.title}</h2>
                    <p className='text-[#707070] text-xs'>{emp.subtitle}</p>
                  </div>
                </div>
              )}
              {emp.subtitle !== 'Gender' && (
                <>
                  <FontAwesomeIcon icon={emp.icon} className='text-[#707070]' />
                  <div className='flex flex-col'>
                    <h2>{emp.title}</h2>
                    <p className='text-[#707070] text-xs'>{emp.subtitle}</p>
                  </div>
                </>
              )}
            </div>
          ))}

        </div>
      </div>

      <h1 className='text-lg font-semibold mt-3 ml-[55px]'>Professional Infomation</h1>
      <div className='flex bg-white px-12 py-5 mt-5 justify-between items-center w-[90%] m-auto rounded-2xl'>
        <div className='flex flex-wrap justify-between gap-8'>
          {workInfo.map((emp) => (
            <div
              key={emp.id}
              className="flex items-center mb-5 gap-5"
            >

              <div className='flex items-center gap-5'>
                <FontAwesomeIcon
                  icon={emp.icon}
                  className='text-[#707070]'
                />
                <div className='flex flex-col'>
                  <h2>{emp.title}</h2>
                  <p className='text-[#707070] text-xs'>{emp.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1 className='text-lg font-semibold mt-3 ml-[55px]'>Salary Infomation</h1>
      <div className='flex bg-white px-12 py-5 mt-5 justify-between items-center w-[90%] m-auto rounded-2xl'>
        <div className='flex flex-wrap justify-between gap-8'>
          {salaryInfo.map((emp) => (
            <div
              key={emp.id}
              className="flex items-center mb-5 gap-5"
            >

              <div className='flex items-center gap-5 '>
                <FontAwesomeIcon
                  icon={emp.icon}
                  className='text-[#707070]'
                />
                <div className='flex flex-col'>
                  <h2>{emp.title}</h2>
                  <p className='text-[#707070] text-xs'>{emp.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
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