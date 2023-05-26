/* eslint-disable no-plusplus */
import { createSlice } from '@reduxjs/toolkit';

const timeRecordSlice = createSlice({
  name: 'timeRecord',
  initialState: {
    timeRecords: [],
    timeRecord: {},
    timeRecordChangeCount: 0,
  },
  reducers: {
    setGetTimeRecords: (state, action) => {
      const { timeRecords } = action.payload;
      state.timeRecords = timeRecords;
    },
    setCreateTimeRecord: (state, action) => {
      const { timeRecord } = action.payload;
      state.timeRecordChangeCount++;
      state.timeRecords = [...state.timeRecords, timeRecord];
    },
    setEditTimeRecord: (state, action) => {
      const { timeRecord } = action.payload;
      state.timeRecordChangeCount++;
      state.timeRecord = timeRecord;
    },
    setDeleteTimeRecord: (state, action) => {
      const { timeRecordId } = action.payload;
      state.timeRecordChangeCount++;
      state.timeRecords = state.timeRecords.filter(
        (timeRecord) => timeRecord._id !== timeRecordId
      );
    },
    setRejectTimeRecord: (state, action) => {
      const { timeRecord } = action.payload;
      state.timeRecordChangeCount++;
      state.timeRecord = timeRecord;
    },
    setGetTimeRecordsByEmployeeForCurrentMonth: (state, action) => {
      const { timeRecords } = action.payload;
      state.timeRecords = timeRecords;
    }
  },
});

export const {
  setGetTimeRecords,
  setCreateTimeRecord,
  setEditTimeRecord,
  setDeleteTimeRecord,
  setRejectTimeRecord,
  setGetTimeRecordsByEmployeeForCurrentMonth,
} = timeRecordSlice.actions;
export default timeRecordSlice.reducer;
