import { MonthSelector, MonthTotals, RecentlyActiveProjects, WeeklyProjectCount } from "../../components";

function Dashboard() {
  const data = [
    { name: 'Project A', hours: 10 },
    { name: 'Project B', hours: 8 },
    { name: 'Project C', hours: 15 },
    { name: 'Project D', hours: 5 },
  ];

  return (
    <div>
      <MonthSelector />
      <div className="flex gap-2 w-full items-stretch flex-nowrap flex-grow-0 flex-shrink-0">
        <div className="bg-[#ecf1f4] w-[300px] p-5  flex-shrink-0 ">
          <div className="flex flex-col justify-between items-start flex-nowrap flex-grow-1 flex-shrink-1">
            <div className="flex flex-col justify-start items-start flex-nowrap flex-grow-1 flex-shrink-1 w-full">
              <h1 className="text-lg text-[#585a5e]">Month totals</h1>
              <MonthTotals />
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 max-w-[610px] min-w-[580px]">
          <div className="flex flex-col justify-start  items-center flex-nowrap flex-grow-1 flex-shrink-1 min-h-[391px]">
            <h1 className="text-lg text-[#585a5e]">Totals by day and week</h1>
            <div className="flex">
              <div className="mr-5">
                <div className="my-[10px] mr-[7px] text-sm text-[#878b8e]">Daily Totals</div>
                <div>
                  <div className="flex flex-col justify-start items-start flex-nowrap mb-[10px]">
                    sample
                  </div>
                </div>
              </div>
              <WeeklyProjectCount data={data} />
            </div>
          </div>
        </div>
        <div className="bg-[#ecf1f4] w-[500px] p-5">
          <h1 className="text-lg text-[#585a5e]">Recently active projects you are assigned to</h1>
          <div className="flex flex-row justify-between items-start w-full flex-wrap mt-9">
            <RecentlyActiveProjects />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;