import { createSlice } from '@reduxjs/toolkit';

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    attendance: {},
    attendanceInfo: [],
  },
  reducers: {
    setMarkAttendance: (state, action) => {
      const { attendance} = action.payload;
      state.attendance = attendance;
    },
  },
});

export const { setMarkAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
