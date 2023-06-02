/* eslint-disable no-plusplus */
import { createSlice } from '@reduxjs/toolkit';

const timeRecordSlice = createSlice({
  name: 'timeRecord',
  initialState: {
    timeRecords: [],
    adminTimeRecords: [],
    timeRecord: {},
    timeRecordChangeCount: 0,
    latestProjects: [],
  },
  reducers: {
    setGetTimeRecords: (state, action) => {
      const { timeRecords } = action.payload;
      state.timeRecords = timeRecords;
    },
    setGetAdminTimeRecords: (state, action) => {
      const { timeRecords } = action.payload;
      state.adminTimeRecords = timeRecords;
    },
    setCreateTimeRecord: (state, action) => {
      const { timeRecord } = action.payload;
      state.timeRecordChangeCount++;
      state.timeRecords.push(timeRecord);
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
    },
    setGetWeeklyRecordsByEmployeeForCurrentMonth: (state, action) => {
      const { timeRecords } = action.payload;
      state.timeRecords = timeRecords;
    },
    setGetLatestWorkedProjects: (state, action) => {
      const { projects } = action.payload;
      state.latestProjects = projects;
    },
  },
});

export const {
  setGetTimeRecords,
  setGetAdminTimeRecords,
  setCreateTimeRecord,
  setEditTimeRecord,
  setDeleteTimeRecord,
  setRejectTimeRecord,
  setGetTimeRecordsByEmployeeForCurrentMonth,
  setGetWeeklyRecordsByEmployeeForCurrentMonth,
  setGetLatestWorkedProjects,
} = timeRecordSlice.actions;
export default timeRecordSlice.reducer;
