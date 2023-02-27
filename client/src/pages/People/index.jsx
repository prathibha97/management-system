/* eslint-disable react/no-unstable-nested-components */
import { faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Loader } from '../../components';
import { getEmployeeList } from '../../redux/actions/employeeActions';


function People() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin

  const { employees, loading } = useSelector((state) => state.employeeList);
  console.log(employees);
  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(getEmployeeList())
      }
    }
  }, [userInfo])



  if (!userInfo || loading) {
    return <Loader />
  }

  const handleEdit = (row) => {
    // handle edit action here
    console.log(`Edit row ${row.empNo}`);
  };

  const handleDelete = (row) => {
    // handle delete action here
    console.log(`Delete row ${row.empNo}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                  style={{ minWidth: 90, backgroundColor: '#E8E8E8', fontWeight: 'bold' }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees?.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell align='center'>{row.empNo}</TableCell>
                  <TableCell align='center'>{row.name.first} {row.name.last}</TableCell>
                  <TableCell align='center'>{row.designation}</TableCell>
                  <TableCell align='center'>{row.department.name}</TableCell>
                  <TableCell align='center'>{row.phone}</TableCell>
                  <TableCell align='center'>
                    <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(row)} className="mx-1 hover:text-[#1DB3AB]" />
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(row)} className="mx-1 hover:text-[#FF6760]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
      <Button title='Add New Employee' icon={faUserPlus} onClick={()=>navigate('/register')}/>
      </div>
    </>
  );
}

export default People