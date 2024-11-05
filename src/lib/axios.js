// lib/axios.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://mgmt.fastsvc.net/api/test/v1/', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage or any other storage method you use
    const token = localStorage.getItem('token');
    
    // If the token exists, set the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle any request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional) to handle responses or errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle the response data as needed
    return response;
  },
  (error) => {
    // Handle errors globally, e.g., redirecting to login on 401 errors
    if (error.response && error.response.status === 401) {
      // Optionally handle token expiration or unauthorized access
      console.error('Unauthorized access - please log in again.');
      localStorage.removeItem('token'); // Clear token on unauthorized access
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
