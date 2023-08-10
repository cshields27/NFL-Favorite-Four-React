// set with NODE_ENV=production npm run build, ex.
const API_URL = process.env.NODE_ENV === 'production' ? 'https://your-production-api-url.com' : 'http://localhost:8000';

export default {
  API_URL,
};