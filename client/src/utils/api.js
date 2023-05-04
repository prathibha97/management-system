import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data'
  },
});

export default api;
