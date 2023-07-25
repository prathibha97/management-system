import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/features/auth/authSelectors";
import { useGetLatestWorkedProjectsQuery, useGetTimeRecordsByEmployeeCurrentMonthQuery, useGetTimeRecordsByEmployeeQuery, useGetWeeklyTimeRecordsForCurrentMonthQuery } from "../../app/features/timeRecords/timeRecordsApiSlice";
import { setGetLatestWorkedProjects, setGetTimeRecordsByEmployeeForCurrentMonth, setGetWeeklyRecordsByEmployeeForCurrentMonth } from "../../app/features/timeRecords/timeRecordsSlice";
import { MonthTotals, MuiCalendar, RecentlyActiveProjects, WeeklyProjectCount } from "../../components";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const { data: monthlyData } = useGetTimeRecordsByEmployeeCurrentMonthQuery({ id: user?._id }, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const { data: dailyTimeRecords, isLoading } = useGetTimeRecordsByEmployeeQuery({ id: user?._id });
  const timeRecords = monthlyData?.timeRecords;

  const { data: weeklyTimeRecordsForTheMonth, refetch } = useGetWeeklyTimeRecordsForCurrentMonthQuery({ id: user?._id });
  const weeklyTimeRecords = weeklyTimeRecordsForTheMonth?.weeklyTotals;

  const { data: latestWorkedProjects } = useGetLatestWorkedProjectsQuery({ id: user?._id })
  const latestProjects = latestWorkedProjects?.projects

  useEffect(() => {
    dispatch(setGetTimeRecordsByEmployeeForCurrentMonth({ timeRecords }));
  }, [monthlyData]);

  useEffect(() => {
    refetch()
    dispatch(setGetWeeklyRecordsByEmployeeForCurrentMonth({ timeRecords }));
  }, [weeklyTimeRecords]);

  useEffect(() => {
    dispatch(setGetLatestWorkedProjects({ projects: latestProjects }));
  }, [latestProjects]);

  return (
    <div className="mt-5">
      <div className="flex flex-wrap gap-2 w-full">
        <div className="bg-[#ecf1f4] w-full lg:w-[620px] p-5">
          <div>
            <h1 className="text-lg text-gray-600 font-bold mb-2">Month Totals</h1>
          </div>
          <MonthTotals data={timeRecords} />
        </div>
        <div className="bg-[#ecf1f4] w-full lg:w-[620px] p-5">
          <h1 className="text-lg text-gray-600 font-bold mb-2">Totals by Day and Week</h1>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="lg:mr-5 mb-5 lg:mb-0">
              <div className="my-2 text-sm text-gray-700">Daily Totals</div>
              <div>
                <MuiCalendar data={dailyTimeRecords} isLoading={isLoading} />
              </div>
            </div>
            <WeeklyProjectCount data={weeklyTimeRecords} />
          </div>
        </div>
        <div className="bg-[#ecf1f4] w-full lg:w-[620px] p-5">
          <h1 className="text-lg text-gray-600 font-bold mb-2">Recently Active Projects You Are Assigned To</h1>
          <div className="flex flex-wrap mt-4 w-full">
            <RecentlyActiveProjects />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
