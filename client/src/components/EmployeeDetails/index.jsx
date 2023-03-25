import React from 'react'
import FilePreview from '../FilePreview'

function EmployeeDetails({user}) {
  return (
    <div className="grid grid-cols-4 p-5 gap-1">
      <div className="bg-white p-2">
        <div className='flex flex-col'>
          <span className='text-[#707070]'>Name</span>
          <span className='text-lg text-center'>{user?.name?.first} {user?.name?.last}</span>
        </div>
      </div>
      <div className="bg-white p-2">
        <div className='flex flex-col'>
          <span className='text-[#707070]'>Email</span>
          <span className='text-lg text-center'>{user?.email}</span>
        </div>
      </div>
      <div className="bg-white p-2">
        <div className='flex flex-col'>
          <span className='text-[#707070]'>Contact No</span>
          <span className='text-lg text-center'>{user?.phone}</span>
        </div>
      </div>
      <div className="bg-white p-2">
        <div className='flex flex-col'>
          <span className='text-[#707070]'>Birth Date</span>
          <span className='text-lg text-center'>{user?.birthDate}</span>
        </div>
      </div>
      <div className="bg-white col-span-2 p-2">
        <div className='flex flex-col'>
          <span className='text-[#707070]'>Designation</span>
          <span className='text-lg text-center'>{user?.designation?.name}</span>
        </div>
      </div>
      <div className="bg-white p-2">
        <div className='flex flex-col'>
          <span className='text-[#707070]'>Department</span>
          <span className='text-lg text-center'>{user?.department?.name}</span>
        </div>
      </div>
      <div className="bg-white p-2">
        <div className='flex flex-col'>
          <span className='text-[#707070]'>Work Type</span>
          <span className='text-lg text-center'>{user?.workType}</span>
        </div>
      </div>
      <div className="bg-white p-2">
        <div className='flex flex-col'>
          <span className='text-[#707070]'>Bank Pass Copy</span>
          <FilePreview fileToView={user?.bankPassPath} />
        </div>
      </div>
      <div className="bg-white p-2">
        <div className='flex flex-col'>
          <span className='text-[#707070]'>ID Copy</span>
          <FilePreview fileToView={user?.idCardPath} />
        </div>
      </div>
      <div className="bg-white col-span-2 p-2">
        <div className='flex flex-col'>
          <span className='text-[#707070]'>Resume Copy</span>
          <FilePreview fileToView={user?.resumePath} />
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetails