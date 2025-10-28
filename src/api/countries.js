import api from "../api/axiosConfig";

//Consulta un país específico por su código ISO
export const getCountryByIso = async (iso) => {
  const res = await api.get(`/api/countries/${iso}`);
  return res.data;
};

//Consulta la capital de un país
export const getCurrencyCountries = async (iso) => {
  const res = await api.get(`/api/countries/${iso}/currency`);
  return res.data;
};

//Devuelve la lista de todos los países disponibles en el SOAP
export const getCountries = async () => {
  const res = await api.get(`/api/countries`);
  return res.data;
};
