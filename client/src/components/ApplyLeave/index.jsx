/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { useState } from 'react';
import Button from '../Button';

function ApplyLeave() {
  const [leaveType, setLeaveType] = useState('')
  const [startDate, setStartDate] = useState(moment().format())
  const [endDate, setEndDate] = useState(moment().format())
  const [reason, setReason] = useState('')
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
                onChange={(e) => setStartDate(e.target.value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="End Date"
                inputFormat="MM/DD/YYYY"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          {/* <textarea
            cols="20"
            rows="5"
            value={reason}
            placeholder='Reason...'
            onChange={(e) => setReason(e.target.value)}
            className='mt-5 border w-[100%] rounded'
          >
            Reason
          </textarea> */}
          <TextField sx={{marginBottom: '20px'}} fullWidth multiline rows={5} label="Reson" value={reason} onChange={(e) => setReason(e.target.value)} />
          <Button title="Apply Leave" />
        </div>
      </div>
    </div>
  )
}

export default ApplyLeave