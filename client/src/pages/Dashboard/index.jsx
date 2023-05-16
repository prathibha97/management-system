import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
      <div className="flex gap-2 w-full items-stretch flex-nowrap flex-grow-0 flex-shrink-0">
        <div className="bg-[#ecf1f4] w-[300px] p-5  flex-shrink-0">
          <div className="flex flex-col justify-between items-start flex-nowrap flex-grow-1 flex-shrink-1">
            <div className="flex flex-col justify-start items-start flex-nowrap flex-grow-1 flex-shrink-1 w-full">
              <div>
                <h1 className="text-lg text-[#585a5e]">Month Totals</h1>
                <div className="flex items-center">
                  <Link to='/timesheet'>
                    <Typography variant="body2" color='navy'>
                      <FontAwesomeIcon icon={faClock} />
                      {' '}
                      View Full Timesheet
                    </Typography>
                  </Link>
                </div>
              </div>
              <MonthTotals />
            </div>
          </div>
        </div>
        <div className="bg-[#ecf1f4] flex-shrink-0 max-w-[610px] min-w-[580px]">
          <div className="flex flex-col justify-start   flex-nowrap flex-grow-1 flex-shrink-1 min-h-[391px] p-5">
            <h1 className="text-lg text-[#585a5e]">Totals by Day and Week</h1>
            <div className="flex items-center">
              <div className="mr-5">
                <div className="my-[10px] mr-[7px] text-sm text-[#878b8e]">Daily Totals</div>
                <div>
                  <MuiCalendar />
                </div>
              </div>
              <WeeklyProjectCount data={data} />
            </div>
          </div>
        </div>
        <div className="bg-[#ecf1f4] w-[500px] p-5">
          <h1 className="text-lg text-[#585a5e]">Recently Active Projects You Are Assigned To</h1>
          <div className="flex flex-row justify-between items-start w-full flex-wrap mt-9">
            <RecentlyActiveProjects />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;