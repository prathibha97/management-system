import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday
} from 'date-fns'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetEmployeeAttendanceAdminQuery } from '../../app/features/attendance/attendanceApiSlice'
import { setEmployeeAttendanceAdmin } from '../../app/features/attendance/attendanceSlice'
import { selectCurrentUser } from '../../app/features/auth/authSelectors'
import { useGetEmployeeLeavesAdminQuery } from '../../app/features/leaves/leaveApiSlice'
import { getLeaveDetailsAdmin } from '../../app/features/leaves/leaveSlice'
import { formatDateShort } from '../../utils/formatDate'
import formatTime from '../../utils/formatTime'
import Loader from '../Loader'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function AttendanceCalendar({ user }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {empNo} = useParams()
  const today = startOfToday()
  const [selectedDay, setSelectedDay] = useState(today)
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  const userInfo = useSelector(selectCurrentUser);

  const { data: attendanceInfo, isLoading: isAttendanceInfoLoading } = useGetEmployeeAttendanceAdminQuery(user?.empNo || empNo)
  const { data: leaves, isLoading: isLeavesLoading } =
    useGetEmployeeLeavesAdminQuery(user?.empNo || empNo, {
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    if (userInfo && attendanceInfo && leaves) {
      const storedUser = JSON.parse(localStorage.getItem('userInfo'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(setEmployeeAttendanceAdmin({ attendanceInfo }));
        dispatch(getLeaveDetailsAdmin({ leaveData: leaves }));
      }
    }
  }, [userInfo, attendanceInfo, leaves]);

  if (isAttendanceInfoLoading || isLeavesLoading) return <Loader />;

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  const selectedDayAttendance = Array.from(attendanceInfo)?.filter(
    (attendance) => isSameDay(parseISO(attendance?.inTime), selectedDay)
  );

  const selectedDayLeaves = Array.from(leaves)?.filter((leave) =>
    isSameDay(parseISO(leave?.startDate), selectedDay)
  );

  const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ];

  return (
    <div className="mt-2 xl:ml-[80px]">
      <div className="max-w-md px-4 sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200 bg-white rounded-lg">
          <div className="md:pr-14">
            <div className="flex items-center p-5">
              <h2 className="flex-auto font-semibold text-gray-900">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="w-5 h-5 text-red-500"
                  aria-hidden="true"
                />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="w-5 h-5 text-red-500"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-4 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-red-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>

                  <div className="flex items-center justify-center w-2 h-2 mx-auto gap-1">
                    {Array.from(attendanceInfo)?.some((attendance) =>
                      isSameDay(parseISO(attendance.inTime), day)
                    ) && <div className="w-1 h-1 rounded-full bg-sky-500" />}
                    {Array.from(leaves)?.some((leave) =>
                      isSameDay(parseISO(leave.startDate), day)
                    ) && <div className="w-1 h-1 rounded-full bg-orange-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-10">
            <div className="flex items-center justify-between pt-5">
              <h2 className="font-semibold text-gray-900">
                Events for{' '}
                <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                  {format(selectedDay, 'MMM dd, yyy')}
                </time>
              </h2>
            </div>
            <div>
              <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {selectedDayAttendance?.length > 0 ? (
                  selectedDayAttendance?.map((attendance) => (
                    <div key={attendance?._id}>
                      <p>Log in time: {formatTime(attendance?.inTime)}</p>
                      <p>Log out time: {formatTime(attendance?.outTime)}</p>
                    </div>
                  ))
                ) : (
                  <p>
                    No events for{' '}
                    <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                      {format(selectedDay, 'MMM dd, yyy')}
                    </time>
                    .
                  </p>
                )}
              </ol>
              <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {selectedDayLeaves?.length > 0 &&
                  selectedDayLeaves?.map((leave) => (
                    <div key={leave?._id}>
                      <p>
                        Leave from {formatDateShort(leave?.startDate)} to{' '}
                        {formatDateShort(leave?.endDate)} approved by{' '}
                        {leave?.approvedBy?.name?.first}
                      </p>
                    </div>
                  ))}
              </ol>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AttendanceCalendar;
