import { EditOutlined, MoreVert as MoreVertIcon, TimerOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startTimer } from '../../app/features/timer/timerSlice';
import { AddTimeRecord, TimeSheetButton, TimeSheetFilter, TimeSheetMenu, ViewTimeEntry } from '../../components';

function TimeSheet() {

  const [rows, setRows] = useState([
    { id: 1, client: 'John Snow', project: 'UI Redesign', task: 'Initial design', workPerformed: 'Drafted the Header component', timeSpent: '05:00', date: '2023-05-15' },
    { id: 2, client: 'Jane Doe', project: 'Backend Development', task: 'Database design', workPerformed: 'Created database schema', timeSpent: '03:30', date: '2023-05-16' },
    { id: 3, client: 'Bob Smith', project: 'Mobile App', task: 'UI Design', workPerformed: 'Designed app screens', timeSpent: '08:15', date: '2023-05-15' },
    { id: 4, client: 'Alice Johnson', project: 'Website Redesign', task: 'Frontend Development', workPerformed: 'Implemented responsive layout', timeSpent: '06:45', date: '2023-05-18' },
    { id: 5, client: 'Eve Wilson', project: 'Data Analysis', task: 'Data Cleaning', workPerformed: 'Processed and cleaned dataset', timeSpent: '04:20', date: '2023-05-19' },
    { id: 6, client: 'David Brown', project: 'Marketing Campaign', task: 'Content Creation', workPerformed: 'Wrote promotional articles', timeSpent: '07:10', date: '2023-05-20' },
    { id: 7, client: 'Emily Davis', project: 'UI Redesign', task: 'UI Testing', workPerformed: 'Conducted user testing', timeSpent: '02:45', date: '2023-05-21' },
    { id: 8, client: 'Michael Wilson', project: 'Database Migration', task: 'Data Transfer', workPerformed: 'Migrated data to new database', timeSpent: '09:30', date: '2023-05-22' },
    { id: 9, client: 'Sam Smith', project: 'Database Migration', task: 'Data Transfer', workPerformed: 'Migrated data to new database', timeSpent: '09:30', date: '2023-04-22' },
    { id: 10, client: 'Jack Baure', project: 'Backend Development', task: 'REST API Design', workPerformed: 'Created the initial routes', timeSpent: '08:30', date: '2023-05-12' },
  ]);

  const [filteredRows, setFilteredRows] = useState(rows);
  const [openCreateDialog, setCreateOpenDialog] = useState(false);
  const dispatch = useDispatch()

  const columns = [
    {
      field: 'actions',
      headerName: '',
      width: 10,
      renderCell: (params) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const [openDialog, setOpenDialog] = useState(false);
        const handleMenuOpen = (event) => {
          setAnchorEl(event.currentTarget);
        };

        const handleMenuClose = () => {
          setAnchorEl(null);
        };

        const handleView = () => {
          console.log('View clicked for ID:', params.id);
          setOpenDialog(true);
          handleMenuClose();
        };

        const handleEdit = () => {
          console.log('Edit clicked for ID:', params.id);
          handleMenuClose();
        };

        const handleDelete = () => {
          console.log('Delete clicked for ID:', params.id);
          const newRows = rows.filter((row) => row.id !== params.id);
          const newFilteredRows = filteredRows.filter((row) => row.id !== params.id);
          setRows(newRows);
          setFilteredRows(newFilteredRows);
          handleMenuClose();
        };

        const handleCloseDialog = () => {
          setOpenDialog(false);
        };

        return (
          <div>
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <TimeSheetMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
            <ViewTimeEntry handleCloseDialog={handleCloseDialog} openDialog={openDialog} params={params} />
          </div>
        );
      },
    },
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'client',
      headerName: 'Client',
      width: 150,
    },
    {
      field: 'project',
      headerName: 'Project',
      width: 150,
    },
    {
      field: 'task',
      headerName: 'Task',
      width: 150,
    },
    {
      field: 'workPerformed',
      headerName: 'Work Performed',
      headerAlign: 'center',
      width: 480,
    },
    {
      field: 'timeSpent',
      headerName: 'Time Spent',
      width: 150,
    },
  ];

  const calculateTotalTime = () => {
    let totalTime = 0;

    filteredRows.forEach((row) => {
      const [hours, minutes] = row.timeSpent.split(':');
      totalTime += Number(hours) * 60 + Number(minutes);
    });

    const formattedHours = Math.floor(totalTime / 60);
    const formattedMinutes = totalTime % 60;

    return (
      `${formattedHours}:${formattedMinutes.toString().padStart(2, '0')}`
    );
  };

  const handleAdd = () => {
    console.log('Add clicked for ID:');
    setCreateOpenDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setCreateOpenDialog(false);
  };

  const handleStartTimer = () => {
    dispatch(startTimer())
  }

  return (
    <div className='flex'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2, alignItems: 'center', marginTop: 2 }}>
        <TimeSheetButton Icon={TimerOutlined} text="Start timer" onClick={handleStartTimer} />
        <TimeSheetButton Icon={EditOutlined} text="Manually" onClick={handleAdd} />
        <AddTimeRecord handleCloseDialog={handleCloseCreateDialog} openDialog={openCreateDialog} />
      </Box>
      <Box sx={{ height: 650, width: '100%', marginTop: 5 }}>
        <TimeSheetFilter rows={rows} setFilteredRows={setFilteredRows} />
        <DataGrid
          rows={filteredRows}
          columns={columns}
          // getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "rgb(232 232 232)",
              color: "black",
              fontSize: 14,
              fontWeight: 900,
            }
          }}
        />
        <Typography variant="body1" sx={{ marginTop: 2 }} color="GrayText">
          <div className='bg-slate-100 w-fit p-3 rounded'>
            Total Time Logged: {calculateTotalTime()}
          </div>
        </Typography>
      </Box>
    </div>
  );
}

export default TimeSheet;