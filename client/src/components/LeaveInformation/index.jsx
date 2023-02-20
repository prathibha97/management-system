/* eslint-disable no-nested-ternary */
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function LeaveInformation() {
  const approvalStatus = 'Approved'
  return (
    <div className='bg-[#EEF2F5] h-[90%] w-[95%] rounded-xl m-auto'>
      <div className='flex flex-col mt-6 ml-[35px]'>
        <h1 className='text-2xl font-bold'>Leave Information</h1>
        <p className='text-[#707070] text-sm'>Here you can view your leave history</p>
      </div>
      {/* leave balance */}
      <div className='flex flex-col justify-between bg-white px-12 py-5 mt-5 w-[90%] m-auto rounded-2xl'>
        <h1 className='font-bold'>Leave Balance</h1>
        <div className='flex flex-col items-center'>
          <div className='flex mt-2 gap-10'>
            <div className='flex flex-col items-center'>
              <h2 className='font-semibold'>4/12</h2>
              <p className='text-[#707070]'>Casual</p>
            </div>
            <div className='flex flex-col items-center'>
              <h2 className='font-semibold'>3/30</h2>
              <p className='text-[#707070]'>Maternity</p>
            </div>
            <div className='flex flex-col items-center'>
              <h2 className='font-semibold'>7/20</h2>
              <p className='text-[#707070]'>Annual</p>
            </div>
            <div className='flex flex-col items-center'>
              <h2 className='font-semibold'>7/10</h2>
              <p className='text-[#707070]'>Other</p>
            </div>
          </div>
        </div>
      </div>

      {/* leave History */}
      <div className='flex flex-col bg-white px-12 py-5 mt-5 h-[450px] overflow-scroll w-[90%] m-auto rounded-2xl'>
        <h1 className='font-bold mb-5'>Leave History</h1>
        <div className='flex items-center justify-between'>
          <FontAwesomeIcon icon={faCircle} className='text-[10px]' />
          <p className='text-sm'>Casual</p>
          <p className='text-sm'>25 Jul - 27 Jul</p>
          <p className={`text-sm ${approvalStatus === 'Pending' ? 'text-yellow-500' : approvalStatus === 'Approved' ? 'text-green-500' : 'text-red-500'}`}>{approvalStatus}</p>
        </div>
        <div className="w-full my-6 border-b" />
        <div className='flex items-center justify-between'>
          <FontAwesomeIcon icon={faCircle} className='text-[10px]' />
          <p className='text-sm'>Annual</p>
          <p className='text-sm'>25 Jul - 27 Jul</p>
          <p className={`text-sm ${approvalStatus === 'Pending' ? 'text-yellow-500' : approvalStatus === 'Approved' ? 'text-green-500' : 'text-red-500'}`}>{approvalStatus}</p>
        </div>
        <div className="w-full my-6 border-b" />
      </div>
    </div>
  )
}

export default LeaveInformation
