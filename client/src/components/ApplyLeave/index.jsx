/* eslint-disable react/jsx-props-no-spreading */
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { Alert, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRequestLeaveMutation } from '../../app/features/leaves/leaveApiSlice';
import { setLeaveRequest } from '../../app/features/leaves/leaveSlice';
import Button from '../Button';

function ApplyLeave({ user, setLeaveChangeCount }) {
  const [leaveType, setLeaveType] = useState('')
  const [startDate, setStartDate] = useState(dayjs().format())
  const [endDate, setEndDate] = useState(dayjs().add(1, 'day').format())
  const [reason, setReason] = useState('')
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [isMedicalSelected, setIsMedicalSelected] = useState(false);
  const [medical, setMedical] = useState(null)
  const dispatch = useDispatch()


  const [requestLeave, { error }] = useRequestLeaveMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const leaveData = await requestLeave({ leaveType, startDate, endDate, reason, medical }).unwrap();
      dispatch(setLeaveRequest({ newLeave: leaveData }));
      setAlert({ open: true, message: 'Leave request created successfully', severity: 'success' });
      setLeaveChangeCount(1);
      setLeaveType('');
      setStartDate(dayjs().format());
      setEndDate(dayjs().add(1, 'day').format());
      setReason('');
    } catch (err) {
      setAlert({ open: true, message: error.data.message, severity: 'error' });
    }
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  useEffect(() => {
    if (error) {
      setAlert({ open: true, message: error.data.message, severity: 'error' });
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
              onChange={(e) => {
                setLeaveType(e.target.value)
                setIsMedicalSelected(e.target.value === 'Medical');
              }
              }
            >
              <MenuItem value='Casual'>Casual</MenuItem>
              {
                user?.leaveBalance?.Maternity === 0 ? null :
                  <MenuItem value='Maternity'>Maternity</MenuItem>
              }
              <MenuItem value='Annual'>Annual</MenuItem>
              <MenuItem value='Medical'>Medical</MenuItem>
              {
                user?.leaveBalance?.BroughtForward === 0 ? null :
                  <MenuItem value='BroughtForward'>Brought Forward</MenuItem>
              }
            </Select>
          </FormControl>
          <div className='flex mt-5 mb-5 gap-5'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Start Date"
                inputFormat="MM/DD/YYYY"
                value={dayjs(startDate)} // Convert startDate to Dayjs object
                onChange={(date) => setStartDate(date.format())} // Convert date to string before updating state
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="End Date"
                inputFormat="MM/DD/YYYY"
                value={dayjs(endDate)} // Convert endDate to Dayjs object
                onChange={(date) => setEndDate(date.format())} // Convert date to string before updating state
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            {isMedicalSelected && (
              <TextField
                sx={{ marginBottom: '20px' }}
                type='file'
                id='pdf-file-input'
                accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
                onChange={(e) => setMedical(e.target.files[0])}
              />
            )}
          </div>
          <TextField sx={{ marginBottom: '20px' }} fullWidth multiline rows={5} label="Reason" value={reason} onChange={(e) => setReason(e.target.value)} />
          <Button title="Apply Leave" onClick={handleSubmit} icon={faGreaterThan} />
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