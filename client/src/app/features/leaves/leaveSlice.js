import { createSlice } from '@reduxjs/toolkit';

const leaveSlice = createSlice({
  name: 'leaves',
  initialState: {
    leaves: [],
    allLeaves: [],
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
      const { leaves } = action.payload;
      state.allLeaves = leaves;
    },
    approveLeaveRequest: (state, action) => {
      const { leaveData } = action.payload;
      state.allLeaves = state.allLeaves.map((leave) =>
        leave._id === leaveData._id ? { ...leave, status: 'approved' } : leave
      );
    },
    rejectLeaveRequest: (state, action) => {
      const { leaveData } = action.payload;
      state.allLeaves = state.allLeaves.map((leave) =>
        leave._id === leaveData._id ? { ...leave, status: 'rejected' } : leave
      );
    },
    deleteLeaveRequest: (state, action) => {
      const { deletedLeave } = action.payload;
      state.allLeaves = state.allLeaves.filter(
        (leave) => leave._id !== deletedLeave._id
      );
    },
    getLeaveDetailsAdmin: (state, action) => {
      const { id, details } = action.payload;
      state.leaves = state.leaves.map((leave) =>
        leave._id === id ? { ...leave, details } : leave
      );
    },
  },
});

export const {
  getUserLeaves,
  approveLeaveRequest,
  deleteLeaveRequest,
  getAllLeaves,
  getLeaveDetailsAdmin,
  rejectLeaveRequest,
  setLeaveRequest,
} = leaveSlice.actions;
export default leaveSlice.reducer;
