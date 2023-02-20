import React from 'react'
import LeaveBalance from '../LeaveBalance'
import LeaveHistory from '../LeaveHistory'

function LeaveInformation({ user, leaves }) {

  return (
    <div className='bg-[#EEF2F5] h-[90%] w-[95%] rounded-xl m-auto'>
      <div className='flex flex-col mt-6 ml-[35px]'>
        <h1 className='text-2xl font-bold'>Leave Information</h1>
        <p className='text-[#707070] text-sm'>Here you can view your leave history</p>
      </div>
      <LeaveBalance user={user} />
      <LeaveHistory leaves={leaves}/>
    </div>
  )
}

export default LeaveInformation
