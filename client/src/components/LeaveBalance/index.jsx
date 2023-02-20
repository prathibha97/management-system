import React from 'react'

function LeaveBalance({user}) {
  return (
    <div className='flex flex-col justify-between bg-white px-12 py-5 mt-5 w-[90%] m-auto rounded-2xl'>
      <h1 className='font-bold'>Leave Balance</h1>
      <div className='flex flex-col items-center'>
        <div className='flex mt-2 gap-10'>
          <div className='flex flex-col items-center'>
            <h2 className='font-semibold'>{user?.leaveBalance?.casual}/10</h2>
            <p className='text-[#707070]'>Casual</p>
          </div>
          <div className='flex flex-col items-center'>
            <h2 className='font-semibold'>{user?.leaveBalance?.maternity}/10</h2>
            <p className='text-[#707070]'>Maternity</p>
          </div>
          <div className='flex flex-col items-center'>
            <h2 className='font-semibold'>{user?.leaveBalance?.annual}/10</h2>
            <p className='text-[#707070]'>Annual</p>
          </div>
          <div className='flex flex-col items-center'>
            <h2 className='font-semibold'>{user?.leaveBalance?.other}/10</h2>
            <p className='text-[#707070]'>Other</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaveBalance