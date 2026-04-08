import axios from 'axios';

// The proxy is set in package.json for local dev, 
// so we can just hit /api directly.
const axiosClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    // Force browser to bypass cache for these requests
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
});

export default axiosClient;