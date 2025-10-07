import api from './axiosConfig';

export const getCompras = async ( page , limit ) => {
    const response = await api.get(`/api/compras`, { params:{ page, limit }});
    return response.data;
}

export const getCompraId = async ( compraId ) => {
    const response = await api.get(`/api/compras/${compraId}`);
    return response.data;
}