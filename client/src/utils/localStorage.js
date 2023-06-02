const userInfo =
  localStorage.getItem('userInfo') &&
  JSON.parse(localStorage.getItem('userInfo'));

const token =
  localStorage.getItem('token') && JSON.parse(localStorage.getItem('token'));

export { userInfo, token };
