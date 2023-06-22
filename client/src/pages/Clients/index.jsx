/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-unstable-nested-components */
import { faEdit, faEye, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../app/features/auth/authSelectors';
import { useGetClientsQuery, useRemoveClientMutation } from '../../app/features/clients/clientApiSlice';
import { getClient, getClients, setRemoveClient } from '../../app/features/clients/clientSlice';
import { Button, Loader } from '../../components';
import AlertDialog from '../../components/AlertDialog';
import { selectClient } from '../../app/features/clients/clientSelectors';


function Clients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [clientListChangeCount, setClientListChangeCount] = useState(0)


  const userInfo = useSelector(selectCurrentUser);

  const client = useSelector(selectClient)

  const [removeClient, { error: errorRemoveClient }] = useRemoveClientMutation()

  const { data: clients, isLoading: isClientListLoading, refetch: refetchClientList } = useGetClientsQuery({
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(getClients({ clients }))
      }
    }
  }, [userInfo])

  useEffect(() => {
    if (errorRemoveClient) {
      setAlert({ open: true, message: errorRemoveClient?.data?.message, severity: 'error' });
    } else {
      refetchClientList()
    }
  }, [errorRemoveClient]);

  useEffect(() => {
    if (clientListChangeCount > 0) {
      refetchClientList()
    }
  }, [clientListChangeCount])


  if (!userInfo || isClientListLoading) {
    return <Loader />
  }

  const handleEdit = (row) => {
    dispatch(getClient({ client: row }))
    navigate(`/clients/${row._id}/edit`)
  };

  const handleView = (row) => {
    navigate(row._id)
  }

  const openDialog = (row) => {
    setOpen(true)
    dispatch(getClient({client:row}))
  }

  const handleClose = () => {
    setOpen(false);
  };

  // const handleDelete = async (client) => {
  //   try {
  //     await removeClient({ id: client._id }).unwrap();
  //     dispatch(setRemoveClient({ id: client._id }));
  //     setClientListChangeCount(prevCount => prevCount + 1);
  //     handleClose();
  //     setAlert({ open: true, message: 'Removed successfully', severity: 'success' });
  //   } catch (err) {
  //     setAlert({ open: true, message: errorRemoveClient?.data?.message, severity: 'error' });
  //   }
  // };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 5 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align='center'
                  style={{ minWidth: 90, backgroundColor: '#E8E8E8', fontWeight: 'bold' }}
                >
                  Name
                </TableCell>
                <TableCell
                  align='center'
                  style={{ minWidth: 90, backgroundColor: '#E8E8E8', fontWeight: 'bold' }}
                >
                  Email
                </TableCell>
                <TableCell
                  align='center'
                  style={{ minWidth: 90, backgroundColor: '#E8E8E8', fontWeight: 'bold' }}
                >
                  Contact
                </TableCell>
                <TableCell
                  align='center'
                  style={{ minWidth: 90, backgroundColor: '#E8E8E8', fontWeight: 'bold' }}
                >
                  Projects
                </TableCell>
                <TableCell
                  align='center'
                  style={{ minWidth: 90, backgroundColor: '#e8e8e8', fontWeight: 'bold' }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients?.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell align='center'>{row.name.first} {row.name.last}</TableCell>
                  <TableCell align='center'>{row.email}</TableCell>
                  <TableCell align='center'>{row.phone}</TableCell>
                  <TableCell align='center'>{row.projectHistory}</TableCell>
                  <TableCell align='center'>
                    <FontAwesomeIcon icon={faEye} onClick={() => handleView(row)} className="mx-1 hover:text-[#1DB3AB] cursor-pointer" />
                    <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(row)} className="mx-1 hover:text-[#1DB3AB] cursor-pointer" />
                    <FontAwesomeIcon icon={faTrash} onClick={() => openDialog(row)} className="mx-1 hover:text-[#FF6760] cursor-pointer" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={clients?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {open && (
        <AlertDialog
          open={open}
          handleClose={handleClose}
          id={client._id}
          setAlert={setAlert}
          title="Are you sure you want to remove this client?"
          remove={removeClient}
          changeCount={setClientListChangeCount}
          errorRemoveEmployee={errorRemoveClient}
          action={setRemoveClient}
        />
      )}

      <div className='flex justify-end mt-10'>
        <Button title='Add New Client' icon={faUserPlus} onClick={() => navigate('/clients/register')} />
      </div>
      <Snackbar open={alert?.open} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert?.severity}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Clients