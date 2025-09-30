import api from './axiosConfig';

export const agregarValidador = async ( userMail ) => {
  const response = await api.post(`/api/productora/equipo/${userMail}`);
  return response.data;
}

export const eliminarValidador = async ( userMail ) => {
  const response = await api.delete(`/api/productora/equipo/${userMail}`);
  return response.data;
}
