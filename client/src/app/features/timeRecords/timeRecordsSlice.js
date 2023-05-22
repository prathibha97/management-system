import { createSlice } from '@reduxjs/toolkit';

const timeRecordSlice = createSlice({
  name: 'timeRecord',
  initialState: {
    timeRecords: [],
    timeRecord: {},
  },
  reducers: {
    setGetTimeRecords: (state, action) => {
      const { timeRecords } = action.payload;
      state.timeRecords = timeRecords;
    },
    setCreateTimeRecord: (state, action) => {
      const { timeRecord } = action.payload;
      state.timeRecords.push(timeRecord);
    },
    setEditTimeRecord: (state, action) => {
      const { timeRecord } = action.payload;
      state.timeRecord = timeRecord;
    },
    setDeleteTimeRecord: (state, action) => {
      const { timeRecordId } = action.payload;
      state.timeRecords = state.timeRecords.filter(
        (timeRecord) => timeRecord._id !== timeRecordId
      );
    },
  },
});

export const {
  setGetTimeRecords,
  setCreateTimeRecord,
  setEditTimeRecord,
  setDeleteTimeRecord,
} = timeRecordSlice.actions;
export default timeRecordSlice.reducer;
