import React from 'react'
import ApplyLeave from '../../components/ApplyLeave'
import LeaveInformation from '../../components/LeaveInformation'

function Leave() {
  return (
    <div className="flex h-[100vh]">
      <div className="flex flex-col flex-1">
        <LeaveInformation />
      </div>
      <div className="flex flex-col flex-1">
        <ApplyLeave/>
      </div>
    </div>
  )
}

export default Leave