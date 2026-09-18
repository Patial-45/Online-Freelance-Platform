import axios from 'axios';

// Detect API base URL: defaults to relative /api in production (or Vite proxy in dev)
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Attach Bearer token from localStorage if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('freelansters_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor to handle global 401s
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Don't auto-redirect on login or register check
      const currentPath = window.location.pathname;
      if (currentPath !== '/Login' && currentPath !== '/login' && !currentPath.includes('register')) {
        // Optional: notify session expiry
      }
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authApi = {
  login: (credentials) => api.post('/Login', credentials),
  register: (userData) => api.post('/register', userData),
  logout: () => api.get('/Logout'),
  getMe: () => api.get('/getdata'),
  getProfile: () => api.get('/profile'),
};

// Jobs endpoints
export const jobsApi = {
  getAll: (params) => api.get('/jobs', { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (jobData) => api.post('/jobs', jobData),
  submitProposal: (jobId, proposalData) => api.post(`/jobs/${jobId}/proposals`, proposalData),
};

// Freelancers endpoints
export const freelancersApi = {
  getAll: (params) => api.get('/freelancers', { params }),
  getById: (id) => api.get(`/freelancers/${id}`),
  create: (freelancerData) => api.post('/freelancers', freelancerData),
  book: (freelancerId, bookingData) => api.post(`/freelancers/${freelancerId}/book`, bookingData),
};

export default api;
