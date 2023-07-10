import CustomPieChart from '../CustomPieChart';

function EmptyData() {
  return (
    <div className="mr-[13px] w-[53px]">
      <div className="w-[50px] h-[50px] rounded-3xl bg-white relative">
        <div className="w-[18px] h-[18px] rounded-lg bg-gray-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}

function WeeklyProjectCount({ data }) {
  return (
    <section>
      <div className="my-[10px] mr-[7px] text-sm text-[#878b8e]">Weekly Totals</div>
      <div className='flex flex-wrap md:flex-col'>
        {data?.map((week, index) => (
          <div key={week.weekStartDate} className="flex justify-start items-center flex-nowrap mt-[15px] h-[53px] ">
            {week.projectCount > 0 && week.totalHours > 0 ? (
              <>
                <div className="mr-[13px] w-[53px]">
                  <CustomPieChart data={week.timeRecords} innerRadius={8} outerRadius={24} />
                </div>
                <div className="flex flex-col text-base text-[#165e92] mr-5">
                  <span className='text-xs'>Week {index + 1}</span>
                  <span>{week.projectCount} project{week.projectCount > 1 ? 's' : ''}</span>
                  <span className="text-[#767a7d]">{week.totalHours.toFixed(2)} h</span>
                </div>
              </>
            ) : (
              <>
                <EmptyData />
                <div className="flex flex-col text-base text-[#869199] mr-3">
                  <span className='text-xs'>Week {index + 1}</span>
                  <p className='text-sm md:text-base'>
                    No data<br />available
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default WeeklyProjectCount;
