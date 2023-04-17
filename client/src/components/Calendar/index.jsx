import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Alert, IconButton, Snackbar } from '@mui/material'
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
import { useNavigate } from 'react-router-dom'
import { getEmployeeList } from '../../redux/actions/employeeActions'
import { cancelMeeting, editMeeting, getMyMeetings, scheduleMeeting } from '../../redux/actions/meetingActions'
// import Loader from '../Loader'
import Meetings from '../Meetings'
import ScheduleMeeting from '../ScheduleMeeting'
import { selectEmployeeList } from '../../features/employees/employeeSelector'
import { selectMyMeetings } from '../../features/meetings/meetingsSelector'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Calendar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const today = startOfToday()
  const [selectedDay, setSelectedDay] = useState(today)
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  // Define a state variable to keep track of whether new meetings have been added or removed
  const [meetingChangeCount, setMeetingChangeCount] = useState(0);

  const {user} = useSelector((state) => state.auth);

  const { employees } = useSelector(selectEmployeeList);
  const { meetings } = useSelector(selectMyMeetings);

  // First useEffect hook to get employee list and meetings
  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('userInfo'));
      if (!storedUser || storedUser.empNo !== user.empNo) {
        dispatch(getMyMeetings())
        dispatch(getEmployeeList())
      }
    }
  }, [user, meetingChangeCount])

  // Second useEffect hook to get meetings again and reset meetingChangeCount
  useEffect(() => {
    dispatch(getMyMeetings())
    setMeetingChangeCount(0);
  }, [dispatch, meetingChangeCount])

  // if (loading) return <Loader />

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  const selectedDayMeetings = meetings?.filter((meeting) =>
    isSameDay(parseISO(meeting?.start?.dateTime), selectedDay)
  )

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };


  const handleMeetingCancel = (id) => {
    try {
      dispatch(cancelMeeting(id));
      setMeetingChangeCount(1);
      setAlert({ open: true, message: 'Meeting Cancelled Successfully', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' });
    }
  }

  const handleMeetingEdit = (id, summary, selectedPeople, startValue, endValue) => {
    try {
      dispatch(editMeeting(id, summary, selectedPeople.map((person) => person.email), startValue, endValue));
      setMeetingChangeCount(1);
      setAlert({ open: true, message: 'Meeting Edited Successfully', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' });
    }
  }

  const handleSubmit = (summary, selectedPeople, startValue, endValue) => {
    try {
      dispatch(scheduleMeeting(summary, selectedPeople.map((person) => person.email), startValue, endValue))
      console.log(`meeting scheduled with ${selectedPeople?.map((person) => person?.name?.first)} ${selectedPeople?.map((person) => person?.name?.last)} on ${startValue} to ${endValue}`);
      setMeetingChangeCount(1);
      setAlert({ open: true, message: `meeting scheduled with ${selectedPeople?.map((person) => person?.name?.first)} ${selectedPeople?.map((person) => person?.name?.last)} on ${startValue} to ${endValue}`, severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: err?.response?.data?.message, severity: 'error' });
    }
    setIsOpen(false)
  }

  const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ]

  return (
    <div className=" pt-12">
      <div className="max-w-md px-4 sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5 text-red-500" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5 text-red-500" aria-hidden="true" />

              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
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

                  <div className="w-1 h-1 mx-auto mt-1">
                    {meetings?.some((meeting) => isSameDay(parseISO(meeting.start.dateTime), day)) ? (
                      <div className="w-1 h-1 rounded-full bg-sky-500" />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-10">
            <div className='flex items-center justify-between'>
              <h2 className="font-semibold text-gray-900">
                Schedule for{' '}
                <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                  {format(selectedDay, 'MMM dd, yyy')}
                </time>
              </h2>
              <IconButton onClick={() => setIsOpen(true)}>
                <FontAwesomeIcon icon={faPlus} />
              </IconButton>
            </div>
            {isOpen && (
              <ScheduleMeeting isOpen={isOpen} setIsOpen={setIsOpen} selectedDay={selectedDay} people={employees} handleSubmit={handleSubmit} />
            )}
            <div>
              <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {selectedDayMeetings?.length > 0 ? (
                  selectedDayMeetings?.map((meeting) => (
                    <Meetings meeting={meeting} key={meeting.id} handleMeetingCancel={handleMeetingCancel} currentUser={user} handleMeetingEdit={handleMeetingEdit} people={employees}  />
                  ))
                ) : (
                  <p>No meetings for today.</p>
                )}
              </ol>
            </div>
          </section>
        </div>
      </div>
      <Snackbar open={alert?.open} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert?.severity}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Calendar