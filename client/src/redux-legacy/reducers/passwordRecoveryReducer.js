const initialState = {
  page: 'login',
  email: '',
  otp: '',
};

// Define reducers
function passwordRecoveryReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_PAGE':
      return {
        ...state,
        page: payload,
      };
    case 'SET_EMAIL':
      return {
        ...state,
        email: payload,
      };
    case 'SET_OTP':
      return {
        ...state,
        otp: payload,
      };
    default:
      return state;
  }
}

module.exports = passwordRecoveryReducer;