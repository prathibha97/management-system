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
      state.meetings.push(meeting);
    },
    setcancelMeeting: (state, action) => {
      const { meetingId } = action.payload;
      console.log(meetingId);
        state.meetings = state.meetings.filter((m) => m._id !== meetingId);
    },
  },
});

export const { setMyMeetings, setScheduleMeeting, setcancelMeeting } =
  meetingSlice.actions;
export default meetingSlice.reducer;
