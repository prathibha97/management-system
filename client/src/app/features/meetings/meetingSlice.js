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
    setScheduleMeeting: (state, action) => {
      const { meeting } = action.payload;
      state.meeting = meeting;
    }
  },
});

export const { setMyMeetings, setScheduleMeeting } = meetingSlice.actions;
export default meetingSlice.reducer;
