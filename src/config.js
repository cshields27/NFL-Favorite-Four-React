// set with NODE_ENV=production npm run build, ex.
const API_URL = process.env.NODE_ENV === 'production' ? 'https://3gk6ght3s6.execute-api.us-east-1.amazonaws.com/dev' : 'http://localhost:8000';
//const API_URL = process.env.NODE_ENV === 'production' ? 'https://your-production-api-url.com' : 'http://192.168.0.14:8000';

export default {
  API_URL,
};