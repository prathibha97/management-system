/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../app/features/auth/authSelectors';
import { useGetTimeRecordsByEmployeeQuery } from '../../app/features/timeRecords/timeRecordsApiSlice';
import DatePopover from '../DatePopover';
import { convertTimeToSeconds } from '../../utils/convertTime';

const initialValue = dayjs();

function ServerDay(props) {
  const { day, outsideCurrentMonth, ...other } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const isSelected = !props.outsideCurrentMonth && props.highlightedDays.indexOf(props.day.date()) > -1;

  const user = useSelector(selectCurrentUser);
  const { data: timeRecordsData } = useGetTimeRecordsByEmployeeQuery({ id: user?._id }, {
    refetchOnMountOrArgChange: true,
  });
  const timeRecords = timeRecordsData?.timeRecords;
  const matchedRecords = Array.isArray(timeRecords)
    ? timeRecords.filter((d) => dayjs(d.date).isSame(day, 'day'))
    : [];

  const { hours, minutes } = matchedRecords.reduce((totalTime, record) => {
    const timeSpent = record?.timeSpent;
    const recordTime = timeSpent ? convertTimeToSeconds(timeSpent) : { hours: 0, minutes: 0 };
    return {
      hours: totalTime.hours + recordTime.hours,
      minutes: totalTime.minutes + recordTime.minutes
    };
  }, { hours: 0, minutes: 0 });

  const isDataAvailable = matchedRecords.length > 0;

  const handleBadgeClick = (event) => {
    const currentDate = dayjs();
    const isPastDate = day.isBefore(currentDate, 'day');
    const isCurrentDate = day.isSame(currentDate, 'day');
    const hasRecordedTime = matchedRecords.length > 0;

    if (isPastDate || (isCurrentDate && hasRecordedTime)) {
      if (!anchorEl) {
        setAnchorEl(event.currentTarget);
      }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Badge
        key={props.day.toString()}
        overlap="circular"
        variant="dot"
        color={
          (day.isBefore(dayjs(), 'day') || (day.isSame(dayjs(), 'day') && hours > 0))
            ? (isSelected && hours >= 8) ? 'primary' : (hours < 8) ? 'error' : 'default'
            : 'default'
        }
        onClick={handleBadgeClick}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
      {anchorEl && (
        <DatePopover
          anchorEl={anchorEl}
          date={day.format('MMM D, YYYY')}
          hours={hours}
          minutes={minutes}
          onClose={handleClose}
          isDataAvailable={isDataAvailable}
        />
      )}
    </>
  );
}


function MuiCalendar() {
  const user = useSelector(selectCurrentUser);
  const { data, isLoading } = useGetTimeRecordsByEmployeeQuery({ id: user?._id },{
    refetchOnMountOrArgChange: true,
  });

  // Check if data is an array before mapping
  const highlightedDays = Array.isArray(data?.timeRecords)
    ? data?.timeRecords.map((d) => dayjs(d.date).date())
    : [];

  // return (
  //   <LocalizationProvider dateAdapter={AdapterDayjs}>
  //     <DateCalendar
  //       defaultValue={initialValue}
  //       loading={isLoading}
  //       renderLoading={() => <DayCalendarSkeleton />}
  //       slots={{
  //         day: ServerDay,
  //       }}
  //       slotProps={{
  //         day: {
  //           highlightedDays,
  //         },
  //       }}
  //     />
  //   </LocalizationProvider>
  // );
  return (
    <div className="flex flex-col items-center">
      {/* <h2 className="text-lg font-bold mb-2">Daily Totals</h2> */}
      <div className="w-full sm:w-auto">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            defaultValue={initialValue}
            loading={isLoading}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              },
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default MuiCalendar;
