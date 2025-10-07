import { createContext } from "react";
import * as apiCompras from "../api/compras";

export const ComprasContext = createContext();

export function ComprasProvider({ children }) {

    const getCompras = async ( page = 1, limit = 10) => {
        try {
            const response = await apiCompras.getCompras( page, limit );
            return response;
        } catch (err) {
            console.error("Error obteniendo compras de entradas de eventos", err);
            return { error: err.message };
        }
    }

    const getCompraId = async ( compraId ) => {
        try {
            const response = await apiCompras.getCompraId (compraId);
            return response;
        } catch (err) {
            console.error("Error obteniendo la compra con ese ID", err);
            return { error: err.message };
        }
    }

    return (
        <ComprasContext.Provider
            value={{
                getCompras,
                getCompraId,
            }}
        >
            {children}
        </ComprasContext.Provider>
    );
}
