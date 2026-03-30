import axios from 'axios';

// ─── Employee Service Axios Instance ────────────────────────────────────────
export const empClient = axios.create({
  baseURL: 'http://localhost:8085/employees',
});

// ─── Auth Service Axios Instance ────────────────────────────────────────────
export const authClient = axios.create({
  baseURL: 'http://localhost:8084',
});

// ─── Request Interceptor: attach JWT token for employee API calls ────────────
// Auth endpoints (login/register) do NOT need a token, so this is only applied
// to empClient.
const attachToken = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// ─── Response Interceptor: handle 401 Unauthorized globally ─────────────────
// If any protected call returns 401, clear token and redirect to login.
const handle401 = (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return Promise.reject(error);
};

// Employee client: always needs JWT + global 401 handling
empClient.interceptors.request.use(attachToken, Promise.reject);
empClient.interceptors.response.use((res) => res, handle401);

// Auth client: only 401 handling (no JWT needed on login/register)
authClient.interceptors.response.use((res) => res, handle401);
