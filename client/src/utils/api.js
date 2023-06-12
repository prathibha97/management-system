import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'api',
  headers: {
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data'
  },
});

export default api;
