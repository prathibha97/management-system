import { AccessTime, CalendarMonth } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react';
import { formatDateShort } from '../../utils/formatDate';

function ViewTimeEntry({ openDialog, handleCloseDialog, params }) {

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ padding: 3 }}>Time View Entry</DialogTitle>
      <DialogContent sx={{ padding: '20px 30px' }}>
        <div className="flex flex-col gap-2 bg-slate-100 p-4 rounded-md">
          <div className="flex items-center">
            <Typography variant="subtitle1" color="textSecondary" sx={{ width: 100 }}>
              Client:
            </Typography>
            <Typography variant="body1">{params?.row?.client?.name?.first} {params?.row?.client?.name?.last}</Typography>
          </div>
          <div className="flex items-center">
            <Typography variant="subtitle1" color="textSecondary" sx={{ width: 100 }}>
              Project:
            </Typography>
            <Typography variant="body1">{params?.row?.project?.title}</Typography>
          </div>
          <div className="flex items-center">
            <Typography variant="subtitle1" color="textSecondary" sx={{ width: 100 }}>
              Task:
            </Typography>
            <Typography variant="body1">{params?.row?.task?.title}</Typography>
          </div>
          <div className="flex items-center">
            <Typography variant="subtitle1" color="textSecondary" sx={{ width: 100 }}>
              Comments:
            </Typography>
            <Typography variant="body1">{params?.row?.workPerformed}</Typography>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col">
            <Typography variant="subtitle1" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarMonth sx={{ mr: 1 }} />
              Date:
            </Typography>
            <Typography variant="body1">{formatDateShort(params?.row?.date)}</Typography>
          </div>
          <div className="flex flex-col">
            <Typography variant="subtitle1" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTime sx={{ mr: 1 }} />
              Reported Time:
            </Typography>
            <Typography variant="body1">{params?.row?.timeSpent}</Typography>
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
