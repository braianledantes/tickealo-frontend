import api from './axiosConfig';

export const getEquipo = async () => {
  const response = await api.get("/api/productora/equipo");
  return response.data; 
};

export const agregarValidador = async (userMail) => {
  const response = await api.post(`/api/productora/equipo/${encodeURIComponent(userMail)}`);
  return response.data;
};

export const eliminarValidador = async (userMail) => {
  const response = await api.delete(
    `/api/productora/equipo/${encodeURIComponent(userMail)}`);
  return response.data;
};

