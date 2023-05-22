import { Button, ButtonGroup } from '@mui/material';
import { useState } from 'react';

function TimeSheetFilter({ rows, setFilteredRows }) {

  const [activeButton, setActiveButton] = useState('');

  const filterByToday = () => {
    const today = new Date().toISOString().split('T')[0];
    const filtered = rows?.filter((row) => row?.date.split('T')[0] === today);
    setFilteredRows(filtered);
    setActiveButton('today');
  };


  const filterByYesterday = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedYesterday = yesterday.toISOString().split('T')[0];
    const filtered = rows?.filter((row) => row?.date.split('T')[0] === formattedYesterday);
    setFilteredRows(filtered);
    setActiveButton('yesterday');
  };

  const filterByThisWeek = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const lastDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));
    const formattedFirstDay = firstDayOfWeek.toISOString().split('T')[0];
    const formattedLastDay = lastDayOfWeek.toISOString().split('T')[0];
    const filtered = rows.filter((row) => {
      const rowDate = row.date.split('T')[0];
      return rowDate >= formattedFirstDay && rowDate <= formattedLastDay;
    });
    setFilteredRows(filtered);
    setActiveButton('thisWeek');
  };

  const filterByPrevWeek = () => {
    const today = new Date();
    const firstDayOfCurrentWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const lastDayOfPrevWeek = new Date(firstDayOfCurrentWeek);
    lastDayOfPrevWeek.setDate(lastDayOfPrevWeek.getDate() - 1);
    const firstDayOfPrevWeek = new Date(lastDayOfPrevWeek);
    firstDayOfPrevWeek.setDate(firstDayOfPrevWeek.getDate() - 6);
    const formattedFirstDay = firstDayOfPrevWeek.toISOString().split('T')[0];
    const formattedLastDay = lastDayOfPrevWeek.toISOString().split('T')[0];
    const filtered = rows.filter((row) => {
      const rowDate = row.date.split('T')[0];
      return rowDate >= formattedFirstDay && rowDate <= formattedLastDay;
    });
    setFilteredRows(filtered);
    setActiveButton('prevWeek');
  };

  const filterByThisMonth = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const formattedFirstDay = firstDayOfMonth.toISOString().split('T')[0];
    const formattedLastDay = lastDayOfMonth.toISOString().split('T')[0];
    const filtered = rows.filter((row) => {
      const rowDate = row.date.split('T')[0];
      return rowDate >= formattedFirstDay && rowDate <= formattedLastDay;
    });
    setFilteredRows(filtered);
    setActiveButton('thisMonth');
  };

  const filterByPrevMonth = () => {
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfPrevMonth = new Date(firstDayOfCurrentMonth);
    lastDayOfPrevMonth.setDate(lastDayOfPrevMonth.getDate() - 1);
    const firstDayOfPrevMonth = new Date(lastDayOfPrevMonth.getFullYear(), lastDayOfPrevMonth.getMonth(), 1);
    const formattedFirstDay = firstDayOfPrevMonth.toISOString().split('T')[0];
    const formattedLastDay = lastDayOfPrevMonth.toISOString().split('T')[0];
    const filtered = rows.filter((row) => {
      const rowDate = row.date.split('T')[0];
      return rowDate >= formattedFirstDay && rowDate <= formattedLastDay;
    });
    setFilteredRows(filtered);
    setActiveButton('prevMonth');
  };

  return (
    <ButtonGroup fullWidth sx={{ marginBottom: 3, backgroundColor: 'rgb(241 244 247)' }}>
      <Button
        variant={activeButton === 'today' ? 'contained' : 'outlined'}
        onClick={filterByToday}
      >Today
      </Button>
      <Button
        variant={activeButton === 'yesterday' ? 'contained' : 'outlined'}
        onClick={filterByYesterday}
      >
        Yesterday
      </Button>
      <Button
        variant={activeButton === 'thisWeek' ? 'contained' : 'outlined'}
        onClick={filterByThisWeek}>
        This Week
      </Button>
      <Button
        variant={activeButton === 'prevWeek' ? 'contained' : 'outlined'}
        onClick={filterByPrevWeek}
      >
        Prev Week
      </Button>
      <Button
        variant={activeButton === 'thisMonth' ? 'contained' : 'outlined'}
        onClick={filterByThisMonth}
      >
        This Month
      </Button>
      <Button
        variant={activeButton === 'prevMonth' ? 'contained' : 'outlined'}
        onClick={filterByPrevMonth}>
        Prev Month
      </Button>
    </ButtonGroup>
  );
}

export default TimeSheetFilter;

