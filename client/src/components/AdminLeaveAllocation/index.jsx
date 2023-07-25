import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useLeaveAllocateMutation } from '../../app/features/leaves/leaveApiSlice';
import Loader from '../Loader';

function AdminLeaveAllocation({ empNo: employeeNumber }) {
  const [empNo, setEmpNo] = useState(employeeNumber);
  const [leaveType, setLeaveType] = useState('');
  const [leaveDays, setLeaveDays] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [leaveAllocate, { isLoading }] = useLeaveAllocateMutation();

  const handleEmpNoChange = (event) => {
    setEmpNo(event.target.value);
  };

  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
  };

  const handleLeaveDaysChange = (event) => {
    setLeaveDays(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const leaveData = await leaveAllocate({ empNo, leaveType, leaveDays });

      setSuccess(leaveData.data.message);
      setEmpNo('');
      setLeaveType('');
    } catch (err) {
      setError('An error occurred while allocating leaves.');
      console.error(err);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            backgroundColor: 'white',
            padding: 5,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', width: '100%', gap: 5 }}>
            <TextField
              label="Employee Number"
              value={empNo}
              onChange={handleEmpNoChange}
              required
              sx={{ width: '325px' }}
            />
            <TextField
              label="Leave Days"
              value={leaveDays}
              onChange={handleLeaveDaysChange}
              required
              sx={{ width: '325px' }}
            />
          </Box>

          <FormControl>
            <InputLabel id="leave-type-label">Leave Type</InputLabel>
            <Select
              labelId="leave-type-label"
              id="leave-type-select"
              value={leaveType}
              onChange={handleLeaveTypeChange}
              required
            >
              <MenuItem value="Duty">Duty</MenuItem>
              <MenuItem value="NoPay">No Pay</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="outlined" color="primary">
            Allocate Leave
          </Button>

          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </Box>
      </form>
    </div>
  );
}

export default AdminLeaveAllocation;
