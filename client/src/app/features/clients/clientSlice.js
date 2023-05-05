import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
  name: 'clients',
  initialState: {
    client: {},
    clients: [],
  },
  reducers: {
    getClients: (state, action) => {
      const { clients } = action.payload;
      state.clients = clients;
    },
  },
});

export const { getClients } = clientSlice.actions;
export default clientSlice.reducer;
