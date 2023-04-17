import { createSlice } from '@reduxjs/toolkit';

const meetingSlice = createSlice({
  name: 'meetings',
  initialState: {
    meeting: {},
    meetings: [],
  },
  reducers: {
    setMyMeetings: (state, action) => {
      const { meetings } = action.payload;
      state.meetings = meetings;
    },
  },
});

export const { setMyMeetings } = meetingSlice.actions;
export default meetingSlice.reducer;
