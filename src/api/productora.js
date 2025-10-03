import api from './axiosConfig';

export const getEventosByProductora = async () => {
  const response = await api.get(`/api/productora/eventos`);
  return response.data;
}

export const getEquipo = async (token) => {
  const response = await api.get("/api/productora/equipo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; 
};

export const getSeguidores = async () => {
  const response = await api.get("/api/productora/seguidores");
  return response.data;
}
