import { AccessTime, CalendarMonth } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';


function ViewTimeEntry({ openDialog, handleCloseDialog, params }) {
  const { client, project, task, workPerformed, date, timeSpent } = params.row
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle sx={{ padding: 5 }}>Time View Entry</DialogTitle>
      <DialogContent>
        <div className='bg-slate-100 p-4 w-[550px]'>
          <div className='flex gap-9'>
            <span className='text-gray-500'>Client</span>
            <span>{client}</span>
          </div>
          <div className='flex gap-9'>
            <span className='text-gray-500'>Project</span>
            <span>{project}</span>
          </div>
          <div className='flex gap-9'>
            <span className='text-gray-500'>Task</span>
            <span>{task}</span>
          </div>
          <div className='flex gap-9'>
            <span className='text-gray-500'>Comments</span>
            <span>{workPerformed}</span>
          </div>
        </div>
        <div className='flex justify-between items-center w-[350px] mt-3 p-4'>
          <div className='flex flex-col '>
            <span className='text-gray-500'>
              <CalendarMonth />
              {' '}
              Date
            </span>
            <span>{date}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-gray-500'>
              <AccessTime />
              {' '}
              Reported Time
            </span>
            <span>{timeSpent}</span>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} autoFocus sx={{ padding: 2 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewTimeEntry