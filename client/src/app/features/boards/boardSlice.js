import { createSlice } from '@reduxjs/toolkit';

const boardlice = createSlice({
  name: 'boards',
  initialState: {
    board: {},
    boards: [],
  },
  reducers: {
    getBoardsByProjectId: (state, action) => {
      const { boards } = action.payload;
      state.boards = boards;
    },
  },
});

export const { getBoardsByProjectId } = boardlice.actions;
export default boardlice.reducer;
