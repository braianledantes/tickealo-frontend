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

export const agregarValidador = async (userMail, token) => {
  const response = await api.post(
    `/api/productora/equipo/${encodeURIComponent(userMail)}`,
    null, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const eliminarValidador = async (userMail, token) => {
  const response = await api.delete(
    `/api/productora/equipo/${encodeURIComponent(userMail)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

