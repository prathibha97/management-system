import CustomPieChart from '../CustomPieChart'

function WeeklyProjectCount({ data }) {
  return (
    <div>
      <div className="my-[10px] mr-[7px] text-sm text-[#878b8e]">Weekly Totals</div>
      <div>
        <div className="flex justify-start items-center flex-nowrap mt-[15px] h-[53px]">
          <div className="mr-[13px] w-[53px]">
            <CustomPieChart data={data} innerRadius={8} outerRadius={24} />
          </div>
          <div className="text-base text-[#165e92]">
            <span>1 project</span>
            <div className="text-[#767a7d]">00:00 h</div>
          </div>
        </div>
        <div className="flex justify-start items-center flex-nowrap mt-[15px] h-[53px] tw-empty">
          <div className="mr-[13px] w-[53px]">
            <div className="w-[50px] h-[50px] rounded-3xl bg-white relative">
              <div className="w-[18px] h-[18px] rounded-lg bg-gray-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="text-base text-[#869199]">No data<br />available</div>
        </div>
        <div className="flex justify-start items-center flex-nowrap mt-[15px] h-[53px] tw-empty">
          <div className="mr-[13px] w-[53px]">
            <div className="w-[50px] h-[50px] rounded-3xl bg-white relative">
              <div className="w-[18px] h-[18px] rounded-lg bg-gray-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="text-base text-[#869199]">No data<br />available</div>
        </div>
        <div className="flex justify-start items-center flex-nowrap mt-[15px] h-[53px] tw-empty">
          <div className="mr-[13px] w-[53px]">
            <div className="w-[50px] h-[50px] rounded-3xl bg-white relative">
              <div className="w-[18px] h-[18px] rounded-lg bg-gray-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="text-base text-[#869199]">No data<br />available</div>
        </div>
        <div className="flex justify-start items-center flex-nowrap mt-[15px] h-[53px] tw-empty">
          <div className="mr-[13px] w-[53px]">
            <div className="w-[50px] h-[50px] rounded-3xl bg-white relative">
              <div className="w-[18px] h-[18px] rounded-lg bg-gray-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="text-base text-[#869199]">No data<br />available</div>
        </div>
      </div>
    </div >
  )
}

export default WeeklyProjectCount
