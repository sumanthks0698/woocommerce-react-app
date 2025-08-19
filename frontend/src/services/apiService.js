import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? window.location.origin 
  : 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 30000,
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const apiService = {
  // Health check
  healthCheck: () => api.get('/health'),

  // Product endpoints
  getProducts: () => api.get('/products'),
  getProduct: (id) => api.get(`/products/${id}`),
  ingestProducts: () => api.post('/products/ingest'),

  // Segment endpoints
  evaluateSegment: (rules) => api.post('/segments/evaluate', { rules }),
};

export default apiService;