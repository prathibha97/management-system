import { createSlice } from '@reduxjs/toolkit';

const passwordRecoverySlice = createSlice({
  name: 'password',
  initialState: {
    page: 'login',
    email: '',
    otp: '',
  },
  reducers: {
    setAuthPage: (state, action) => {
      state.page = action.payload;
    },
    setAuthEmail: (state, action) => {
      state.email = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
  },
});

export const { setAuthPage, setAuthEmail, setOtp } = passwordRecoverySlice.actions;
export default passwordRecoverySlice.reducer;
