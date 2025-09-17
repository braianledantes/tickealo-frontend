import api from './axiosConfig';

export const login = async (credentials) => {
  const response = await api.post(`/api/auth/login`, credentials);
  return response.data;
};
