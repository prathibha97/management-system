import { faBriefcase, faEnvelope, faGift, faHouse, faHouseLaptop, faMars, faMobilePhone, faVenus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import React from 'react';

function EmployeeCard({ employee }) {

  const birthdateString = employee.birthDate;
  const birthdate = new Date(birthdateString);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const formattedDate = birthdate.toLocaleDateString('en-US', options);

  const empDetails = [
    {
      id: 1,
      icon: faEnvelope,
      title: employee.email,
      subtitle: 'Email',
    },
    {
      id: 2,
      icon: faMobilePhone,
      title: employee.phone,
      subtitle: 'Telephone',
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
      title: employee.gender,
      titleFemale: 'Female',
      subtitle: 'Gender',
    },
    {
      id: 5,
      icon: faHouse,
      title: `${employee?.address?.street}, ${employee?.address?.city}, ${employee?.address?.state}, ${employee?.address?.zip}`,
      subtitle: 'Address',
    },
  ];
  return (
    <div className='bg-[#EEF2F5] h-[90%] w-[95%] rounded-xl m-auto'>
      <div className='flex flex-col mt-6 ml-[35px]'>
        <h1 className='text-2xl font-bold'>User Information</h1>
        <p className='text-[#707070] text-sm'>Here you can edit public details about yourself</p>
      </div>
      <div className='flex flex-col items-center mt-4'>
        <div className='h-[90%] w-[95%] rounded-xl ml-12'>
          <div className='flex bg-white p-6 rounded-2xl w-[90%] justify-between px-[100px]'>
            <Avatar src='https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png' />
            <div>
              <h1 className='font-bold text-lg'>{employee?.name?.first} {employee?.name?.last}</h1>
              <p className='text-sm text-[#707070]'>{employee?.designation}</p>
              <p className='text-sm text-[#707070]'>Employee Id: {employee?.empNo}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between bg-white p-10 rounded-2xl w-[90%] mt-5">
            {empDetails.map((emp) => (
              <div
                key={emp.id}
                className={`flex items-center mb-5 gap-5 w-${emp.id === 5 ? 'full' : '1/2'
                  }`}
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

            <div className="w-full my-6 border-b" />

            <div className="flex flex-wrap gap-10">
              <div className="flex gap-5 items-center">
                <FontAwesomeIcon icon={faBriefcase} className='text-[#707070]' />
                <div>
                  <h2>{employee?.department?.name}</h2>
                  <p className='text-[#707070] text-xs'>Department</p>
                </div>
              </div>
              <div className="flex gap-5 items-center">
                <FontAwesomeIcon icon={faHouseLaptop} className='text-[#707070]' />
                <div>
                  <h2>{employee?.workType}</h2>
                  <p className='text-[#707070] text-xs'>Work Type</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard