import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, IconButton, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import AddExperience from '../AddExperience';

function ExperienceCard({ employee }) {

  const [isOpen, setIsOpen] = useState(false)
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });


  const formatDate = (date) => {
    const isoDate = date;
    const dateObj = new Date(isoDate);
    const formattedDate = `${dateObj.getMonth() + 1}-${dateObj.getDate()}-${dateObj.getFullYear()}`;
    return formattedDate;
  }

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <div className='bg-[#EEF2F5] h-[90%] w-[95%] rounded-xl m-auto'>
      <div className='flex flex-col mt-6 ml-[35px]'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Work Experience</h1>
          <IconButton sx={{ marginRight: 2 }} onClick={() => setIsOpen(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </IconButton>
        </div>
        <p className='text-[#707070] text-sm'>Here you can edit your work experience</p>
      </div>
      {isOpen && (
        <AddExperience isOpen={isOpen} setIsOpen={setIsOpen} setAlert={setAlert} />
      )}
      {employee.employmentHistory?.map((item, index) => (
        <div className='flex bg-white px-12 py-5 mt-5 justify-between items-center w-[90%] m-auto rounded-2xl' key={index}>
          <div>
            <h2 className='font-bold text-lg'>{item.position}</h2>
            <p className='text-sm text-[#707070]'>{item.company}</p>
          </div>
          <div className='mr-[60px]'>
            <p className='text-xs text-[#707070]'>Start date: {formatDate(item.startDate)}</p>
            <p className='text-xs text-[#707070]'>End date: {formatDate(item.endDate)}</p>
          </div>
        </div>
      ))}
      <Snackbar open={alert?.open} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert?.severity}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ExperienceCard