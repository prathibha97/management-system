/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-unstable-nested-components */
import { faEdit, faEye, faSheetPlastic, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../app/features/auth/authSelectors';
import { useDeleteProjectMutation, useGetAllProjectsQuery } from '../../app/features/projects/projectApiSlice';
import { setDeleteProject, setProjects, setSelectedProject } from '../../app/features/projects/projectSlice';
import { Button, Loader } from '../../components';
import AlertDialog from '../../components/AlertDialog';
import { formatDate } from '../../utils/formatDate';


function Projects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [projectChangeCount, setProjectChangeCount] = useState(0)

  const userInfo = useSelector(selectCurrentUser);


  const { data: projects, isloading: isProjectsLoading, isFetching: isProjectsFetching, refetch: refetchProjects } = useGetAllProjectsQuery({
    refetchOnMountOrArgChange: true,
  });

  const [deleteProject, { isloading: isProjectDeleteLoading, error }] = useDeleteProjectMutation()

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(setProjects({ projects }))
      }
    }
  }, [userInfo])

  useEffect(() => {
    if (error) {
      setAlert({ open: true, message: error?.data?.message, severity: 'error' });
    } else {
      refetchProjects()
    }
  }, [error]);

  useEffect(() => {
    if (projectChangeCount > 0) {
      refetchProjects()
    }
  }, [projectChangeCount])


  if (!userInfo || isProjectsLoading || isProjectsFetching || isProjectDeleteLoading) {
    return <Loader />
  }

  const handleEdit = (row) => {
    dispatch(setSelectedProject({ project: row }))
    navigate(`/projects/${row._id}/edit`)
  };

  const handleView = (row) => {
    navigate(row._id)
  }

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
                  Title
                </TableCell>
                <TableCell
                  align='center'
                  style={{ minWidth: 90, backgroundColor: '#E8E8E8', fontWeight: 'bold' }}
                >
                  Client
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
                  Category
                </TableCell>
                <TableCell
                  align='center'
                  style={{ minWidth: 90, backgroundColor: '#E8E8E8', fontWeight: 'bold' }}
                >
                  Dead-line
                </TableCell>
                <TableCell
                  align='center'
                  style={{ minWidth: 90, backgroundColor: '#E8E8E8', fontWeight: 'bold' }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects?.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell align='center'>{row?.title}</TableCell>
                  <TableCell align='center'>{row?.client?.name?.first} {row?.client?.name?.last}</TableCell>
                  <TableCell align='center'>{row?.department?.name}</TableCell>
                  <TableCell align='center'>{row?.category}</TableCell>
                  <TableCell align='center'>{formatDate(row?.deadline)}</TableCell>
                  <TableCell align='center'>
                    <FontAwesomeIcon icon={faEye} onClick={() => handleView(row)} className="mx-1 hover:text-[#1DB3AB] cursor-pointer" />
                    <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(row)} className="mx-1 hover:text-[#1DB3AB] cursor-pointer" />
                    <FontAwesomeIcon icon={faTrash} onClick={() => setOpen(true)} className="mx-1 hover:text-[#FF6760] cursor-pointer" />
                    {open && (
                      <AlertDialog open={open} handleClose={handleClose} setAlert={setAlert} id={row._id} title='Are you sure you want to remove this project?' remove={deleteProject} changeCount={setProjectChangeCount} action={setDeleteProject} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={projects?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <div className='flex justify-end mt-10'>
        <Button title='Create New Project' icon={faSheetPlastic} onClick={() => navigate('/projects/create')} />
      </div>
      <Snackbar open={alert?.open} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert?.severity}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Projects