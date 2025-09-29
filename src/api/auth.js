import api from './axiosConfig';

export const login = async (credentials) => {
  const response = await api.post(`/api/auth/login`, credentials);
  return response.data;
};

export const me = async (token) => {
  const response = await api.get(`/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const registerProductora = async (formData) => {
  const response = await api.post(`/api/auth/register-productora`, formData);
  return response.data;
};

export const crearEvento = async (formData) => {
  const response = await api.post('/api/eventos', formData);
  return response.data;
};