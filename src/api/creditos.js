import api from "./axiosConfig";

export const getHistorialCreditos = async () => {
  const response = await api.get('/api/creditos/historial');
  return response;
}

