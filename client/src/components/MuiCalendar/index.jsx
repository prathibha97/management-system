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
import DatePopover from '../DatePopover';

const dummyData = [
  { date: '2023-05-01', hours: 8 },
  { date: '2023-05-02', hours: 4 },
  { date: '2023-05-03', hours: 0 },
  { date: '2023-05-04', hours: 6 },
  { date: '2023-05-05', hours: 5 },
  { date: '2023-05-06', hours: 7 },
  { date: '2023-05-07', hours: 9 },
];

const initialValue = dayjs();

function ServerDay(props) {
  const { day, outsideCurrentMonth, ...other } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const isSelected = !props.outsideCurrentMonth && props.highlightedDays.indexOf(props.day.date()) > -1;

  const workedDay = dummyData.find((d) => dayjs(d.date).isSame(day, 'day'));

  const isDataAvailable = workedDay !== undefined;

  const handleBadgeClick = (event) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
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
        variant='dot'
        color={isSelected && workedDay?.hours >= 8 ? 'primary' : workedDay?.hours < 8 ? 'error' : 'default'}
        onClick={handleBadgeClick}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
      {anchorEl && (
        <DatePopover anchorEl={anchorEl} date={day.format('MMM D, YYYY')} hours={workedDay?.hours} onClose={handleClose} isDataAvailable={isDataAvailable} />
      )}
    </>
  );
}

function MuiCalendar() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        // loading={isLoading}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays: dummyData.map((d) => dayjs(d.date).date()),
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default MuiCalendar;