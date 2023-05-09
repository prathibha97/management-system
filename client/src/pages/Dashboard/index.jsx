import { Calendar, MonthTotals, RecentlyActiveProjects } from "../../components";

function Dashboard() {
  

  return (
    <div>
      <div>calendar header</div>
      <div className="flex gap-2 w-full items-stretch flex-nowrap flex-grow-0 flex-shrink-0">
        <div className="bg-[#ecf1f4] w-[400px] p-5  flex-shrink-0 ">
          <div className="flex flex-col justify-between items-start flex-nowrap flex-grow-1 flex-shrink-1">
            <div className="flex flex-col justify-start items-start flex-nowrap flex-grow-1 flex-shrink-1 w-full">
              <h1 className="text-lg text-[#585a5e]">Month totals</h1>
              <MonthTotals />
            </div>
          </div>
        </div>
        <div className="bg-[#ecf1f4]">Totals by day and week
          <Calendar />
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

