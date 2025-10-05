import api from './axiosConfig';

export const getCompras = async () => {
    const response = await api.get(`/api/compras`);
    return response.data;
}