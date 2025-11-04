import api from './axiosConfig';

export const crearEvento = async (formData) => {
  const response = await api.post('/api/eventos', formData);
  return response.data;
};

export const subirImagenEvento = async (eventoId, formDataImages) => {
  const response = await api.patch(`/api/eventos/${eventoId}/imagenes`, formDataImages);
  return response.data;
};

export const getEventos = async () => {
  const response = await api.get(`/api/eventos`);
  return response.data.data;
};

export const getEventoById = async (id) => {
  const response = await api.get(`/api/eventos/${id}`);
  return response.data;
};

export const actualizarEvento = async (id, updateFormData) => {
  const response = await api.patch(`/api/eventos/${id}`, updateFormData);
  return response.data;
}

export const eliminarEvento = async (id) => {
  const response = await api.delete(`/api/eventos/${id}`);
  return response.data;
}

export const ticketsEvento = async (eventoId) => {
  const response = await api.get(`/api/tickets/eventos/${eventoId}`);
  return response.data;
}