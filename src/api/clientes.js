import api from "./axiosConfig";

export const buscarClientes = async (term) => {
  const res = await api.get(`/api/clientes`, {
    params: { search: term },
  });

  return res.data.clientes;
};

export const buscarClientePorEmail = async (email) => {
  const res = await api.get("/api/clientes", {
    params: { search: email },
  });

  const clientes = res.data.clientes.filter((c) =>
    c.user.email.toLowerCase().includes(email.toLowerCase())
  );

  return clientes;
};
