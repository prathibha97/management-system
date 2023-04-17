import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('userInfo')),
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { employee, token } = action.payload;
      state.user = employee;
      localStorage.setItem('userInfo', JSON.stringify(employee));
      state.token = token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, setLogout } = authSlice.actions;
export default authSlice.reducer;
