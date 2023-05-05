import { Alert, Chip, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../app/features/auth/authSelectors';
import { useApproveLeaveMutation, useDeleteLeaveMutation, useGetAllLeavesQuery, useRejectLeaveMutation } from '../../app/features/leaves/leaveApiSlice';
import { approveLeaveRequest, deleteLeaveRequest, getAllLeaves, rejectLeaveRequest } from '../../app/features/leaves/leaveSlice';
import { LeaveRejectDialog, Loader } from '../../components';
import { formatDate } from '../../utils/formatDate';


export default function DataGridDemo() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const [openRejectDialog, setOpenRejectDialog] = useState(false);

  const [leaveChangeCount, setLeaveChangeCount] = useState(0)

  const userInfo = useSelector(selectCurrentUser);

  const [approveLeave, { error: errorApproval }] = useApproveLeaveMutation()

  const [rejectLeave, { error: errorReject }] = useRejectLeaveMutation()
  const [deleteLeave, { error: errorDelete }] =useDeleteLeaveMutation()

  const { data: leaves, isLoading: isLeavesLoading, refetch: refetchLeaves } = useGetAllLeavesQuery({
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(getAllLeaves({ leaves }))
      }
    }
  }, [userInfo])

  useEffect(() => {
    refetchLeaves()
    setLeaveChangeCount(0);
  }, [leaveChangeCount])

  useEffect(() => {
    if (errorApproval || errorReject || errorDelete) {
      setAlert({ open: true, message: errorApproval?.data?.message || errorReject?.data?.message || errorDelete?.data?.message, severity: 'error' });
    }
  }, [errorApproval, errorReject, errorDelete]);


  if (!userInfo || isLeavesLoading) {
    return <Loader />
  }

  const columns = [
    { field: 'empNo', headerName: 'Emp No', width: 90 },
    {
      field: 'fullName',
      headerName: 'Full name',
      sortable: false,
      width: 140,
      // headerAlign: 'center',
      valueGetter: (params) =>
        `${params?.row?.employee?.name?.first || ''} ${params?.row?.employee?.name?.last || ''}`,
    },
    {
      field: 'leaveType',
      headerName: 'Leave Type',
      width: 110,
      // headerAlign: 'center',
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 110,
      // headerAlign: 'center',
      valueFormatter: ({ value }) => formatDate(value),
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 110,
      // headerAlign: 'center',
      valueFormatter: ({ value }) => formatDate(value),
    },
    {
      field: 'reason',
      headerName: 'Reason',
      width: 240,
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      // headerAlign: 'center',
      renderCell: (params) => {
        const status = params.value;

        let color;
        if (status === 'Approved') {
          color = 'green';
        } else if (status === 'Pending') {
          color = 'orange';
        } else if (status === 'Rejected') {
          color = 'red';
        }

        return (
          <span style={{ color }}>
            {status}
          </span>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 160,
      headerAlign: 'center',
      renderCell: (params) => {
        const { status } = params.row;
        if (status === 'Pending') {
          const handleApprove = async () => {
            const leaveId = params.row._id;
            const { empNo } = params.row;
            try {
              const leaveData = await approveLeave({ id: empNo, lId: leaveId, status: 'Approved' }).unwrap()
              dispatch(approveLeaveRequest({ leaveData }))
              setLeaveChangeCount(1)
              setAlert({ open: true, message: 'Leave Approved successfully', severity: 'success' });
            } catch (err) {
              setAlert({ open: true, message: errorApproval?.data?.message, severity: 'error' });
            }
          };

          const handleRejectDialog = () => {
            setOpenRejectDialog(true);
          };

          const handleReject = async (reason) => {
            const leaveId = params.row._id;
            const { empNo } = params.row;
            try {
              const leaveData = await rejectLeave({ id: empNo, lId: leaveId, status: 'Rejected', reason }).unwrap()
              dispatch(rejectLeaveRequest({ leaveData }))
              setLeaveChangeCount(1)
              setAlert({ open: true, message: 'Leave Rejected successfully', severity: 'success' });
            } catch (err) {
              setAlert({ open: true, message: errorReject.data.message, severity: 'error' });
            }
          }

          return (
            <div>
              <Chip label="Approve" color='success' variant='outlined' onClick={() => handleApprove(params)} />
              {openRejectDialog &&
                <LeaveRejectDialog open={openRejectDialog} onClose={() => setOpenRejectDialog(false)} onReject={handleReject} />
              }

              <Chip label="Reject" color='error' variant='outlined' sx={{ marginLeft: 1 }} onClick={() => handleRejectDialog(params)} />
            </div>
          );
        }
        const handleDelete = async() => {
          const leaveId = params.row._id;
          try {
            const deletedLeave = await deleteLeave({leaveId}).unwrap()
            dispatch(deleteLeaveRequest({deletedLeave}));
            setLeaveChangeCount(1)
            setAlert({ open: true, message: 'Leave Deleted successfully', severity: 'success' });
          } catch (err) {
            setAlert({ open: true, message: errorDelete?.data?.message, severity: 'error' });
          }
        }

        return <Chip label="Delete Request" color='warning' variant='outlined' onClick={() => handleDelete(params)} />;
      },
    },
    {
      field: 'rejectionReason',
      headerName: 'Rejection Reason',
      width: 170,
      headerAlign: 'center',
    }
  ];


  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Box sx={{ height: 650, width: '100%', marginTop: 4 }}>
      <DataGrid
        rows={leaves.map((leave) => leave)}
        getRowId={(leave) => leave._id}
        columns={columns}
        autoPageSize
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgb(232 232 232)",
            color: "black",
            fontSize: 14,
            fontWeight: 900,
          }
        }}
        pageSizeOptions={[10]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
      <Snackbar open={alert?.open} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert?.severity}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}