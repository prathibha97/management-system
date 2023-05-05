import React from 'react'

function LeaveBalance({user}) {
  return (
    <div className='flex flex-col justify-between bg-white px-12 py-5 mt-5 w-[90%] m-auto rounded-2xl'>
      <h1 className='font-bold'>Leave Balance</h1>
      <div className='flex flex-col items-center'>
        <div className='flex mt-2 gap-10'>
          <div className='flex flex-col items-center'>
            <h2 className='font-semibold'>{user?.leaveBalance?.Casual}/7</h2>
            <p className='text-[#707070]'>Casual</p>
          </div>
          {user?.leaveBalance?.Maternity === 0 ? null :(
          <div className='flex flex-col items-center'>
            <h2 className='font-semibold'>{user?.leaveBalance?.Maternity}/10</h2>
            <p className='text-[#707070]'>Maternity</p>
          </div>
          )}
          <div className='flex flex-col items-center'>
            <h2 className='font-semibold'>{user?.leaveBalance?.Annual}/7</h2>
            <p className='text-[#707070]'>Annual</p>
          </div>
          <div className='flex flex-col items-center'>
            <h2 className='font-semibold'>{user?.leaveBalance?.Medical}/7</h2>
            <p className='text-[#707070]'>Medical</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaveBalance