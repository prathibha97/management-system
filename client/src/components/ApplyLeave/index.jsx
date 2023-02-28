/* eslint-disable react/jsx-props-no-spreading */
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { Alert, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLeaveRequest } from '../../redux/actions/leaveActions';
import Button from '../Button';

function ApplyLeave() {
  const [leaveType, setLeaveType] = useState('')
  const [startDate, setStartDate] = useState(moment().format())
  const [endDate, setEndDate] = useState(moment().format())
  const [reason, setReason] = useState('')
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const dispatch = useDispatch()

  const leaveRequest = useSelector((state) => state.leaveRequest);
  const { error } = leaveRequest;

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(createLeaveRequest(leaveType, startDate, endDate, reason))
      setAlert({ open: true, message: 'Leave reaquest created successfully', severity: 'success' });
    } catch (err) {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' });
    }
  }

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  useEffect(() => {
    if (error) {
      setAlert({ open: true, message: error, severity: 'error' });
    }
  }, [error]);

  return (
    <div className='bg-[#EEF2F5] h-[90%] w-[95%] rounded-xl m-auto'>
      <div className='flex flex-col mt-6 ml-[35px]'>
        <h1 className='text-2xl font-bold'>Apply For Leave</h1>
        <p className='text-[#707070] text-sm'>Here you can apply for a leave</p>
      </div>
      <div className='flex flex-col justify-between bg-white px-12 py-5 mt-5 w-[90%] m-auto rounded-2xl'>
        <div>
          <FormControl fullWidth>
            <InputLabel>Leave Type</InputLabel>
            <Select
              value={leaveType}
              label="Leave Type"
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <MenuItem value='Casual'>Casual</MenuItem>
              <MenuItem value='Maternity'>Maternity</MenuItem>
              <MenuItem value='Annual'>Annual</MenuItem>
              <MenuItem value='Other'>Other</MenuItem>
            </Select>
          </FormControl>
          <div className='flex mt-5 mb-5 gap-5'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Start Date"
                inputFormat="MM/DD/YYYY"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="End Date"
                inputFormat="MM/DD/YYYY"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <TextField sx={{ marginBottom: '20px' }} fullWidth multiline rows={5} label="Reason" value={reason} onChange={(e) => setReason(e.target.value)} />
          <Button title="Apply Leave" onClick={handleSubmit} icon={faGreaterThan}/>
        </div>
      </div>
      <Snackbar open={alert?.open} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert?.severity}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ApplyLeave