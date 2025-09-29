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
  const response = await api.patch("/cuenta-bancaria", data);
  return response.data;
};

export const eliminarCuentaBancaria = async () => {
  const response = await api.delete("/cuenta-bancaria");
  return response.data;
};
