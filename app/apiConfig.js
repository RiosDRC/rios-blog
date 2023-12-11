let API_BASE_URL;

if (process.env.NODE_ENV === 'development') {
  API_BASE_URL = 'http://localhost:8800/api';
} else {
  API_BASE_URL = 'https://rios-blog-server-production.up.railway.app/api';
}
export default API_BASE_URL