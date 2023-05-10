import React from 'react'
import CustomPieChart from '../CustomPieChart'

function WeeklyProjectCount({data}) {
  return (
    <div>
      <div className="my-[10px] mr-[7px] text-sm text-[#878b8e]">Weekly Totals</div>
      <div className="tw-db-week-charts">
        <div className="flex justify-start items-center flex-nowrap mt-[15px] h-[53px]">
          <div className="mr-[13px] w-[53px]">
            <CustomPieChart data={data} innerRadius={8} outerRadius={24}/>
          </div>
          <div className="text-base text-[#165e92]">
            <span>1 project</span>
            <div className="text-[#767a7d]">00:00 h</div>
          </div>
        </div>
        <div className="flex justify-start items-center flex-nowrap mt-[15px] h-[53px] tw-empty">
          <div className="mr-[13px] w-[53px]">
            <div className="tw-db-empty-charts" />
            <CustomPieChart data={data} innerRadius={8} outerRadius={24} />
          </div>
          <div className="text-base text-[#869199]">No data<br />available</div>
        </div>
        <div className="flex justify-start items-center flex-nowrap mt-[15px] h-[53px] tw-empty">
          <div className="mr-[13px] w-[53px]">
            <div className="tw-db-empty-charts" />
            <CustomPieChart data={data} innerRadius={8} outerRadius={24} />
          </div>
          <div className="text-base text-[#869199]">No data<br />available</div>
        </div>
        <div className="flex justify-start items-center flex-nowrap mt-[15px] h-[53px] tw-empty">
          <div className="mr-[13px] w-[53px]">
            <div className="tw-db-empty-charts" />
            <CustomPieChart data={data} innerRadius={8} outerRadius={24} />
          </div>
          <div className="text-base text-[#869199]">No data<br />available</div>
        </div>
        <div className="flex justify-start items-center flex-nowrap mt-[15px] h-[53px] tw-empty">
          <div className="mr-[13px] w-[53px]">
            <div className="tw-db-empty-charts" />
            <CustomPieChart data={data} innerRadius={8} outerRadius={24} />
          </div>
          <div className="text-base text-[#869199]">No data<br />available</div>
        </div>
      </div>
    </div >
  )
}

export default WeeklyProjectCount