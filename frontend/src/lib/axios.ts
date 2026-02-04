import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For handling cookies (JWT/Session)
});

// Add request interceptor if needed later (e.g., for auth headers if not using cookies only)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here (e.g., 401 redirects)
    return Promise.reject(error);
  }
);
