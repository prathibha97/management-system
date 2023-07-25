/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-unstable-nested-components */
import { faEdit, faEye, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../app/features/auth/authSelectors';
import { useEmployeeListQuery, useRemoveEmployeeMutation } from '../../app/features/employees/employeeApiSlice';
import { selectEmployee } from '../../app/features/employees/employeeSelector';
import { setEmployeeList, setRemoveEmployee, setSelectEmployee } from '../../app/features/employees/employeeSlice';
import { Button, Loader } from '../../components';
import AlertDialog from '../../components/AlertDialog';


function People() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [employeeListChangeCount, setEmployeeListChangeCount] = useState(0)

  const userInfo = useSelector(selectCurrentUser);
  const employee = useSelector(selectEmployee)

  const [removeEmployee, { error: errorRemoveEmployee }] = useRemoveEmployeeMutation()
  const { data: employees, isLoading: isEmployeeListLoading, refetch: refetchEmployeeList } = useEmployeeListQuery({
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(setEmployeeList({ employees }))
      }
    }
  }, [userInfo])

  useEffect(() => {
    if (errorRemoveEmployee) {
      setAlert({ open: true, message: errorRemoveEmployee?.data?.message, severity: 'error' });
    } else {
      refetchEmployeeList()
    }
  }, [errorRemoveEmployee]);

  useEffect(() => {
    if (employeeListChangeCount > 0) {
      refetchEmployeeList()
    }
  }, [employeeListChangeCount])


  if (!userInfo || isEmployeeListLoading) {
    return <Loader />
  }

  const handleEdit = (row) => {
    navigate(`${row.empNo}/edit`)
    dispatch(setSelectEmployee({ employee: row }))
  };

  const handleView = (row) => {
    navigate(`/people/${row.empNo}`);
  }

  const handleOpen = (row) => {
    setOpen(true);
    dispatch(setSelectEmployee({ employee: row }))
  };

  const handleClose = () => {
    setOpen(false);
  };


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
                  Emp No
                </TableCell>
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
                  Designation
                </TableCell>
                <TableCell
                  align='center'
                  style={{ minWidth: 90, backgroundColor: '#E8E8E8', fontWeight: 'bold' }}
                >
                  Department
                </TableCell>
                <TableCell
                  align='center'
                  style={{ minWidth: 90, backgroundColor: '#E8E8E8', fontWeight: 'bold' }}
                >
                  Contact
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
              {employees?.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell align='center'>{row.empNo}</TableCell>
                  <TableCell align='center'>{row.name.first} {row.name.last}</TableCell>
                  <TableCell align='center'>{row.designation?.name}</TableCell>
                  <TableCell align='center'>{row.department?.name}</TableCell>
                  <TableCell align='center'>{row.phone}</TableCell>
                  <TableCell align='center'>
                    <FontAwesomeIcon icon={faEye} onClick={() => handleView(row)} className="mx-1 hover:text-[#1DB3AB] cursor-pointer" />
                    <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(row)} className="mx-1 hover:text-[#1DB3AB] cursor-pointer" />
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleOpen(row)} className="mx-1 hover:text-[#FF6760] cursor-pointer" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {open && (
            <AlertDialog open={open} handleClose={handleClose} setAlert={setAlert} id={employee.empNo} title='Are you sure you want to remove this employee?' remove={removeEmployee} changeCount={setEmployeeListChangeCount} errorRemoveEmployee={errorRemoveEmployee} action={setRemoveEmployee} />
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={employees?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <div className='flex justify-end mt-10'>
        <Button title='Add New Employee' icon={faUserPlus} onClick={() => navigate('/people/register')} />
      </div>
      <Snackbar open={alert?.open} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert?.severity}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default People