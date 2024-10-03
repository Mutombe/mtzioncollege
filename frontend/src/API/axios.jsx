import axios from 'axios';
import { getAccessTokenSilently } from '@auth0/auth0-react';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await getAccessTokenSilently();
    config.headers.Authorization = `Bearer ${token}`;
  } catch (error) {
    console.error('Error getting access token', error);
  }
  return config;
});

export default api;