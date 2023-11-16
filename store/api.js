import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your_api_base_url.com', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
