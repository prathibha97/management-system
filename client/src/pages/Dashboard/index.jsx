
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/features/auth/authSelectors";
import { useGetTimeRecordsByEmployeeCurrentMonthQuery, useGetTimeRecordsByEmployeeQuery } from "../../app/features/timeRecords/timeRecordsApiSlice";
import { setGetTimeRecordsByEmployeeForCurrentMonth } from "../../app/features/timeRecords/timeRecordsSlice";
import { MonthTotals, MuiCalendar, RecentlyActiveProjects, WeeklyProjectCount } from "../../components";

function Dashboard() {

  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser)

  const { data: monthlyData} = useGetTimeRecordsByEmployeeCurrentMonthQuery({ id: user?._id }, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const { data , isLoading} = useGetTimeRecordsByEmployeeQuery({ id: user?._id })
  const timeRecords = monthlyData?.timeRecords;

  useEffect(() => {
    dispatch(setGetTimeRecordsByEmployeeForCurrentMonth({ timeRecords }))
  }, [timeRecords])

  return (
    <div className="mt-5">
      <div className="flex gap-2 w-full">
        <div className="bg-[#ecf1f4] w-[620px] p-5">
          <div>
            <h1 className="text-lg text-gray-600 font-bold mb-2">Month Totals</h1>
          </div>
          <MonthTotals data={timeRecords} />
        </div>
        <div className="bg-[#ecf1f4] max-w-[610px] min-w-[580px] p-5">
          <h1 className="text-lg text-gray-600 font-bold mb-2">Totals by Day and Week</h1>
          <div className="flex items-center">
            <div className="mr-5">
              <div className="my-2 text-sm text-gray-700">Daily Totals</div>
              <div>
                <MuiCalendar data={data} isLoading={isLoading}/>
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
