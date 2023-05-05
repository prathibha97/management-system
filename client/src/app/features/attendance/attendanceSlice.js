import { createSlice } from '@reduxjs/toolkit';

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    attendance: {},
    attendanceInfo: [],
    attendanceAdmin: [],
  },
  reducers: {
    setMarkAttendance: (state, action) => {
      const { attendance } = action.payload;
      state.attendance = attendance;
      state.attendanceInfo.push(attendance);
    },
    setEmployeeAttendance: (state, action) => {
      const { attendanceInfo } = action.payload;
      state.attendanceInfo = attendanceInfo;
    },
    setEmployeeAttendanceAdmin: (state, action) => {
      const { attendanceInfo } = action.payload;
      state.attendanceAdmin = attendanceInfo;
    },
  },
});

export const {
  setMarkAttendance,
  setEmployeeAttendance,
  setEmployeeAttendanceAdmin,
} = attendanceSlice.actions;
export default attendanceSlice.reducer;
