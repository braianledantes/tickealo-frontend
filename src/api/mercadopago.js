import api from "./axiosConfig";

export const createPreference = async (preferenceData) => {
  const response = await api.post('/api/mercado-pago/create-preference', preferenceData);
  return response;
}