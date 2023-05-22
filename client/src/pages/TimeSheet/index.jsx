import { EditOutlined, MoreVert as MoreVertIcon, TimerOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useCreateTimeRecordMutation,
  useDeleteTimeRecordMutation,
  useGetAllTimeRecordsQuery,
} from '../../app/features/timeRecords/timeRecordsApiSlice';
import {
  setCreateTimeRecord,
  setDeleteTimeRecord,
  setGetTimeRecords,
} from '../../app/features/timeRecords/timeRecordsSlice';
import { startTimer } from '../../app/features/timer/timerSlice';
import {
  AddTimeRecord,
  EditTimeRecord,
  Loader,
  TimeSheetButton,
  TimeSheetFilter,
  TimeSheetMenu,
  ViewTimeEntry,
} from '../../components';



function TimeSheet() {

  const dispatch = useDispatch();

  const { data: timeSheetData, refetch: refetchTimeSheetData } = useGetAllTimeRecordsQuery({
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    dispatch(setGetTimeRecords({ timeRecords: timeSheetData }));
  }, []);

  const [filteredRows, setFilteredRows] = useState(timeSheetData || []);
  const [timeRecordChangeCount, setTimeRecordChangeCount] = useState(0);
  const [openCreateDialog, setCreateOpenDialog] = useState(false);

  const [createTimeRecord, { isLoading: isCreateTimeRecordLoading }] = useCreateTimeRecordMutation();
  const [deleteTimeRecord, { isLoading: isDeleteTimeRecordLoading }] = useDeleteTimeRecordMutation();

  useEffect(() => {
    if (timeRecordChangeCount > 0) {
      refetchTimeSheetData();
    }
  }, [timeRecordChangeCount]);

  const columns = [
    {
      field: 'actions',
      headerName: '',
      width: 10,
      renderCell: (params) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const [openDialog, setOpenDialog] = useState(false);
        const [openEditDialog, setOpenEditDialog] = useState(false);

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
          setOpenEditDialog(true);
          handleMenuClose();
        };

        const handleDelete = async () => {
          try {
            await deleteTimeRecord({ id: params.id }).unwrap();
            dispatch(setDeleteTimeRecord({ timeRecordId: params.id }));
            const newFilteredRows = filteredRows.filter((row) => row._id !== params.id);
            setFilteredRows(newFilteredRows);
            setTimeRecordChangeCount((prev) => prev + 1);
            handleMenuClose();
          } catch (error) {
            console.log('Error deleting time record:', error);
          }
        };

        const handleCloseDialog = () => {
          setOpenDialog(false);
        };

        const handleCloseEditDialog = () => {
          setOpenEditDialog(false);
        };

        const handleEditRecord = (client, project, task, workPerformed, dateLogged, timeLogged) => {
          console.log(client, project, task, workPerformed, dateLogged, timeLogged);
          setOpenEditDialog(false);
        };

        return (
          <div>
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <TimeSheetMenu
              anchorEl={anchorEl}
              handleMenuClose={handleMenuClose}
              handleView={handleView}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            <ViewTimeEntry handleCloseDialog={handleCloseDialog} openDialog={openDialog} params={params} />
            <EditTimeRecord
              handleSubmit={handleEditRecord}
              handleCloseEditDialog={handleCloseEditDialog}
              openEditDialog={openEditDialog}
              params={params}
            />
          </div>
        );
      },
    },
    {
      field: 'employee',
      headerName: 'Employee',
      width: 160,
      valueGetter: (params) => `${params?.row?.employee?.name?.first || ''} ${params?.row?.employee?.name?.last || ''}`,
    },
    {
      field: 'client',
      headerName: 'Client',
      width: 150,
      valueGetter: (params) => `${params?.row?.client?.name || ''}`,
    },
    {
      field: 'project',
      headerName: 'Project',
      width: 150,
      valueGetter: (params) => `${params?.row?.project?.title || ''}`,
    },
    {
      field: 'task',
      headerName: 'Task',
      width: 150,
      valueGetter: (params) => `${params?.row?.task?.title || ''}`,
    },
    {
      field: 'workPerformed',
      headerName: 'Work Performed',
      headerAlign: 'center',
      width: 480,
      align: 'center',
    },
    {
      field: 'timeSpent',
      headerName: 'Time Spent',
      width: 150,
    },
  ];

  const calculateTotalTime = () => {
    let totalTime = 0;

    filteredRows?.forEach((row) => {
      const [hours, minutes, seconds = 0] = (row.timeSpent ?? '0:0').split(':');
      totalTime += Number(hours) * 60 + Number(minutes) + Number(seconds) / 60;
    });

    const formattedHours = Math.floor(totalTime / 60);
    const formattedMinutes = Math.floor(totalTime % 60);

    return `${formattedHours}:${formattedMinutes.toString().padStart(2, '0')}`;
  };

  const handleAdd = () => {
    console.log('Add clicked for ID:');
    setCreateOpenDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setCreateOpenDialog(false);
  };

  const handleCreateRecord = async (project, timeLogged, client, dateLogged, workPerformed, task) => {
    try {
      const timeRecordData = await createTimeRecord({ project, timeSpent: timeLogged, client, date: dateLogged, workPerformed, task }).unwrap();
      dispatch(setCreateTimeRecord({ timeRecord: timeRecordData.timeRecord }));
      setCreateOpenDialog(false);
      setTimeRecordChangeCount((prev) => prev + 1);
      // Update the filtered rows when a new record is created
      const updatedRows = [...filteredRows, timeRecordData.timeRecord];
      console.log('updatedRows', updatedRows);
      setFilteredRows(updatedRows);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStartTimer = () => {
    dispatch(startTimer());
  };

  if (isCreateTimeRecordLoading || isDeleteTimeRecordLoading) return <Loader />;

  return (
    <div className="flex">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2, alignItems: 'center', marginTop: 2 }}>
        <TimeSheetButton Icon={TimerOutlined} text="Start timer" onClick={handleStartTimer} />
        <TimeSheetButton Icon={EditOutlined} text="Manually" onClick={handleAdd} />
        <AddTimeRecord handleSubmit={handleCreateRecord} handleCloseDialog={handleCloseCreateDialog} openDialog={openCreateDialog} />
      </Box>
      <Box sx={{ height: 650, width: '100%', marginTop: 5 }}>
        <TimeSheetFilter rows={timeSheetData || []} setFilteredRows={setFilteredRows} />
        <DataGrid
          rows={filteredRows}
          getRowId={(row) => row?._id || row?.id}
          columns={columns}
          pagination
          pageSize={10}
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'rgb(232 232 232)',
              color: 'black',
              fontSize: 14,
              fontWeight: 900,
            },
          }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="body1" sx={{ marginTop: 2 }} color="GrayText">
            <div className="bg-slate-100 w-fit p-3 rounded">
              Total Time Logged: {calculateTotalTime()}
            </div>
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }} color="crimson">
            <div className="bg-slate-100 w-fit p-3 rounded">Rejected: {calculateTotalTime()}</div>
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default TimeSheet;
