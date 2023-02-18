import React from 'react';

function ExperienceCard({ employee }) {
  const formatDate = (date) => {
    const isoDate = date;
    const dateObj = new Date(isoDate);
    const formattedDate = `${dateObj.getMonth() + 1}-${dateObj.getDate()}-${dateObj.getFullYear()}`;
    return formattedDate;
  }

  return (
    <div className='bg-[#EEF2F5] h-[90%] w-[95%] rounded-xl m-auto'>
      <div className='flex flex-col mt-6 ml-[35px]'>
        <h1 className='text-2xl font-bold'>Work Experience</h1>
        <p className='text-[#707070] text-sm'>Here you can edit your work experience</p>
      </div>
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
    </div>
  )
}

export default ExperienceCard