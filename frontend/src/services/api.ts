import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await api.post('/auth/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  register: async (userData: { email: string; name: string; password: string; role?: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Legal API
export const legalAPI = {
  searchPrecedents: async (searchData: {
    query: string;
    court?: string;
    year_from?: number;
    year_to?: number;
    limit?: number;
  }) => {
    const response = await api.post('/api/legal/search-precedents', searchData);
    return response.data;
  },

  getPrecedentDetail: async (precedentId: string) => {
    const response = await api.get(`/api/legal/precedent/${precedentId}`);
    return response.data;
  },

  chatWithAI: async (message: { content: string; context?: any }) => {
    const response = await api.post('/api/legal/chat', message);
    return response.data;
  },

  analyzeDocument: async (file: File, analysisType: string = 'summary') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('analysis_type', analysisType);
    
    const response = await api.post('/api/legal/analyze-document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getAvailableCourts: async () => {
    const response = await api.get('/api/legal/courts');
    return response.data;
  },

  getRecentCases: async (limit: number = 10) => {
    const response = await api.get(`/api/legal/recent-cases?limit=${limit}`);
    return response.data;
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
