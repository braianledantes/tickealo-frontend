import api from './axiosConfig';

export const crearEvento = async (formData) => {
  const response = await api.post('/api/eventos', formData);
  return response.data;
};

export const getEventoById = async (id) => {
  const res = await api.get(`/api/eventos/${id}`);
  return res.data;
};

export const subirImagenEvento = async (eventoId, formDataImages) => {
  const response = await api.patch(`/api/eventos/${eventoId}/imagenes`, formDataImages);
  return response.data;
};

export const getEventos = async (token) => {
  const response = await api.get(`/api/eventos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};