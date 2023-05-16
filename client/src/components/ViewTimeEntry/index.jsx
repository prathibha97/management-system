import { AccessTime, CalendarMonth } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react';

function ViewTimeEntry({ openDialog, handleCloseDialog, params }) {
  const { client, project, task, workPerformed, date, timeSpent } = params.row;

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ padding: 3 }}>Time View Entry</DialogTitle>
      <DialogContent sx={{ padding: '20px 30px' }}>
        <div className="flex flex-col gap-2 bg-slate-100 p-4 rounded-md">
          <div className="flex items-center">
            <Typography variant="subtitle1" color="textSecondary" sx={{ width: 100 }}>
              Client:
            </Typography>
            <Typography variant="body1">{client}</Typography>
          </div>
          <div className="flex items-center">
            <Typography variant="subtitle1" color="textSecondary" sx={{ width: 100 }}>
              Project:
            </Typography>
            <Typography variant="body1">{project}</Typography>
          </div>
          <div className="flex items-center">
            <Typography variant="subtitle1" color="textSecondary" sx={{ width: 100 }}>
              Task:
            </Typography>
            <Typography variant="body1">{task}</Typography>
          </div>
          <div className="flex items-center">
            <Typography variant="subtitle1" color="textSecondary" sx={{ width: 100 }}>
              Comments:
            </Typography>
            <Typography variant="body1">{workPerformed}</Typography>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col">
            <Typography variant="subtitle1" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarMonth sx={{ mr: 1 }} />
              Date:
            </Typography>
            <Typography variant="body1">{date}</Typography>
          </div>
          <div className="flex flex-col">
            <Typography variant="subtitle1" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTime sx={{ mr: 1 }} />
              Reported Time:
            </Typography>
            <Typography variant="body1">{timeSpent}</Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewTimeEntry;
