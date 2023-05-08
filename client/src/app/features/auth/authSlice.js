import { createSlice } from '@reduxjs/toolkit';

function checkTokenValidity(user) {
  if (user && user.token) {
    const decodedToken = JSON.parse(atob(user.token.split('.')[1]));
    if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
      return user;
    }
  }
  return 'Session expired. Please log in again.';
}


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: checkTokenValidity(JSON.parse(localStorage.getItem('userInfo'))),
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
      localStorage.removeItem('persist:root');
    },
  },
});

export const { setCredentials, setLogout } = authSlice.actions;
export default authSlice.reducer;
