import { createSlice } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    time: 0,
    isRunning: false,
  },
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    pauseTimer: (state) => {
      state.isRunning = false;
    },
    stopTimer: (state) => {
      state.isRunning = false;
      state.time = 0;
    },
    updateTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { startTimer, pauseTimer, stopTimer, updateTime } =
  timerSlice.actions;
export default timerSlice.reducer;
