import { createSlice } from '@reduxjs/toolkit';

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    attendance: {},
    attendanceInfo: [],
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
  },
});

export const { setMarkAttendance, setEmployeeAttendance } =
  attendanceSlice.actions;
export default attendanceSlice.reducer;
