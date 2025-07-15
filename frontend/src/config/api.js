// API configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // In production, use relative path to your API
  : 'http://localhost:8000';  // For local development

export default API_BASE_URL;
