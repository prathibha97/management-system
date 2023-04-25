import { createSlice } from '@reduxjs/toolkit';

const leaveSlice = createSlice({
  name: 'leaves',
  initialState: {
    leaves: [],
  },
  reducers: {
    setLeaveRequest: (state, action) => {
      const { newLeave } = action.payload;
      state.leaves.push(newLeave);
    },
    getUserLeaves: (state, action) => {
      const { leaves } = action.payload;
      state.leaves = leaves;
    },
    getAllLeaves: (state, action) => {
      const { id } = action.payload;
      console.log('Removing experience:', id);
      state.experiences = state.experiences.filter((exp) => exp._id !== id);
    },
    approveLeave: (state, action) => {
      const { id } = action.payload;
      console.log('Removing experience:', id);
      state.experiences = state.experiences.filter((exp) => exp._id !== id);
    },
    rejectLeave: (state, action) => {
      const { id } = action.payload;
      console.log('Removing experience:', id);
      state.experiences = state.experiences.filter((exp) => exp._id !== id);
    },
    deleteLeave: (state, action) => {
      const { id } = action.payload;
      console.log('Removing experience:', id);
      state.experiences = state.experiences.filter((exp) => exp._id !== id);
    },
    getLeaveDetailsAdmin: (state, action) => {
      const { id } = action.payload;
      console.log('Removing experience:', id);
      state.experiences = state.experiences.filter((exp) => exp._id !== id);
    },
  },
});

export const {
  getUserLeaves,
  approveLeave,
  deleteLeave,
  getAllLeaves,
  getLeaveDetailsAdmin,
  rejectLeave,
  setLeaveRequest,
} = leaveSlice.actions;
export default leaveSlice.reducer;
