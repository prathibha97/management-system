
import { MonthTotals, MuiCalendar, RecentlyActiveProjects, WeeklyProjectCount } from "../../components";

function Dashboard() {
  const data = [
    { name: 'Project A', hours: 10 },
    { name: 'Project B', hours: 8 },
    { name: 'Project C', hours: 15 },
    { name: 'Project D', hours: 5 },
  ];

  return (
    <div className="mt-5">
      {/* <MonthSelector /> */}
      <div className="flex gap-2 w-full">
        <div className="bg-[#ecf1f4] w-[420px] p-5">
          <div>
            <h1 className="text-lg text-gray-600 font-bold mb-2">Month Totals</h1>
          </div>
          <MonthTotals data={data}/>
        </div>
        <div className="bg-[#ecf1f4] max-w-[610px] min-w-[580px] p-5">
          <h1 className="text-lg text-gray-600 font-bold mb-2">Totals by Day and Week</h1>
          <div className="flex items-center">
            <div className="mr-5">
              <div className="my-2 text-sm text-gray-700">Daily Totals</div>
              <div>
                <MuiCalendar />
              </div>
            </div>
            <WeeklyProjectCount data={data} />
          </div>
        </div>
        <div className="bg-[#ecf1f4] w-[500px] p-5">
          <h1 className="text-lg text-gray-600 font-bold mb-2">Recently Active Projects You Are Assigned To</h1>
          <div className="flex flex-wrap mt-4">
            <RecentlyActiveProjects />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
