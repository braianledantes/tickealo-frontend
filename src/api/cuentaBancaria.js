import api from "./axiosConfig";

export const crearCuentaBancaria = async (data) => {
  const response = await api.post("/api/cuenta-bancaria", data);
  return response.data;
};

export const getCuentaBancarias = async () => {
  const res = await api.get('/api/cuenta-bancaria');
  return res.data;
};

export const actualizarCuentaBancaria = async (data) => {
  const response = await api.patch("/api/cuenta-bancaria", data);
  return response.data;
};

export const eliminarCuentaBancaria = async () => {
  const response = await api.delete("/api/cuenta-bancaria");
  return response.data;
};
