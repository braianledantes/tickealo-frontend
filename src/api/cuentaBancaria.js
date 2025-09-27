import api from "./axiosConfig";

export const crearCuentaBancaria = async (data) => {
  const response = await api.post("/api/cuenta-bancaria", data);
  return response.data;
};

export const getCuentasBancarias = async () => {
  const res = await api.get('/api/cuenta-bancaria');
  return res.data;
};