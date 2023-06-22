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
    getClient: (state, action) => {
      const { client } = action.payload;
      state.client = client;
    },
    setCreateClient: (state, action) => {
      const { client } = action.payload;
      state.clients.push(client);
    },
    setRemoveClient: (state, action) => {
      const { id } = action.payload;
      console.log(id);
      state.clients = state.clients.filter((client) => client._id !== id);
    },
    setEditClient: (state, action) => {
      const { client } = action.payload;
      const updatedClients = state.clients.map((c) =>
        c._id === client._id ? client : c
      );
      state.clients = updatedClients;
      state.client = client;
    },
  },
});

export const {
  getClients,
  getClient,
  setCreateClient,
  setRemoveClient,
  setEditClient,
} = clientSlice.actions;
export default clientSlice.reducer;
