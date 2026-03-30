import { authClient } from './api';

export const login = async (credentials) => {
  return authClient.post('/auth/login', credentials);
};

export const register = async (userData) => {
  return authClient.post('/auth/register', userData);
};
