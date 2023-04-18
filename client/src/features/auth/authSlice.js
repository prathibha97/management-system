import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('userInfo')),
    token: JSON.parse(localStorage.getItem('token')),
  },
  reducers: {
    setCredentials: (state, action) => {
      const { employee, token } = action.payload;
      state.user = employee;
      localStorage.setItem('userInfo', JSON.stringify(employee));
      localStorage.setItem('token', JSON.stringify(token));
      state.token = token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, setLogout } = authSlice.actions;
export default authSlice.reducer;
