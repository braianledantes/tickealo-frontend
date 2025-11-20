import { createContext } from "react";
import * as apiCompras from "../api/compras";
import { useState } from "react";

export const ComprasContext = createContext();

export function ComprasProvider({ children }) {
    const [ loadingCompras, setLoadingCompras ] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ compras, setCompras ] = useState([]);
    const [comprasAceptadas, setComprasAceptadas] = useState([]);
    const [comprasPendientes, setComprasPendientes] = useState([]);
    const [comprasRechazadas, setComprasRechazadas] = useState([]);

    const getCompras = async ( page = 1, limit = 10) => {
        setLoadingCompras(true);
        setError(null);
        try {
            const response = await apiCompras.getCompras( page, limit );
            setCompras(response);
            return response;
        } catch (err) {
            console.error("Error obteniendo compras de entradas de eventos", err);
            return { error: err.message };
        } finally {
            setLoadingCompras(false); 
        }
    }

    const cargarComprasPorEstado = async (estado, page = 1, limit = 10) => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiCompras.getComprasFiltradas(page, limit, estado);
            if (!response) return;

            switch (estado) {
                case "ACEPTADA": {
                    setComprasAceptadas(response);
                    break;
                }

                case "PENDIENTE":
                    setComprasPendientes(response);
                    break;

                case "RECHAZADA":
                    setComprasRechazadas(response);
                    break;

                default:
                    console.warn(`Estado de compra desconocido: ${estado}`);
            }

            return response;
        } catch (err) {
            setError(`No se pudo obtener las compras con estado ${estado}.`);
            console.error(`Error obteniendo compras con estado ${estado}:`, err);
        } finally {
            setLoading(false);
        }
    };


    const getCompraId = async ( compraId ) => {
        try {
            const response = await apiCompras.getCompraId (compraId);
            return response;
        } catch (err) {
            console.error("Error obteniendo la compra con ese ID", err);
            return { error: err.message };
        }
    }

    const aceptarCompra = async ( compraId ) => {
        try {
            const response = await apiCompras.aceptarCompra( compraId);
            return response;
        } catch (err) {
            console.error("Error aceptando la compra con ese ID", err);
            return { error: err.message };
        }
    }

    const cancelarCompra = async ( compraId ) => {
        try {
            const response = await apiCompras.cancelarCompra( compraId);
            return response;
        } catch (err) {
            console.error("Error cancelando la compra con ese ID", err);
            return { error: err.message };
        }
    }

    return (
        <ComprasContext.Provider
            value={{
                getCompras,
                getCompraId,
                aceptarCompra,
                cancelarCompra,
                loading,
                loadingCompras,
                compras,
                error,
                comprasAceptadas,
                comprasPendientes,
                comprasRechazadas,
                cargarComprasPorEstado,
            }}
        >
            {children}
        </ComprasContext.Provider>
    );
}
