import { Alert, Chip, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LeaveRejectDialog, Loader } from '../../components';
import { approveLeaveRequest, getAllLeaveDetails, rejectLeaveRequest } from '../../redux/actions/leaveActions';
import { formatDate } from '../../utils/formatDate';



export default function DataGridDemo() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const [openRejectDialog, setOpenRejectDialog] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin

  const approveLeave = useSelector((state) => state.approveLeave);
  const { error } = approveLeave;

  const rejectLeave = useSelector((state) => state.rejectLeave);
  const { errorReject } = rejectLeave;

  const { leaves, loading } = useSelector((state) => state.allLeaveDetails);

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(getAllLeaveDetails())
      }
    }
  }, [userInfo])

  useEffect(() => {
    if (error || errorReject) {
      setAlert({ open: true, message: error || errorReject, severity: 'error' });
    }
  }, [error, errorReject]);

  if (!userInfo || loading) {
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
      width: 280,
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
      width: 170,
      headerAlign: 'center',
      renderCell: (params) => {
        const handleApprove = () => {
          const leaveId = params.row._id;
          const { empNo } = params.row;
          try {
            dispatch(approveLeaveRequest({ leaveId, empNo, status: 'Approved' }))
            setAlert({ open: true, message: 'Leave Approved successfully', severity: 'success' });
          } catch (err) {
            setAlert({ open: true, message: err.response.data.message, severity: 'error' });
          }
        };

        const handleRejectDialog = () => {
          setOpenRejectDialog(true);
        };

        const handleReject = (reason) => {
          console.log(reason);
          const leaveId = params.row._id;
          const { empNo } = params.row;
          try {
            dispatch(rejectLeaveRequest({ leaveId, empNo, status: 'Rejected', reason}))
            setAlert({ open: true, message: 'Leave Rejected successfully', severity: 'success' });
          } catch (err) {
            setAlert({ open: true, message: err.response.data.message, severity: 'error' });
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
      },
    },
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