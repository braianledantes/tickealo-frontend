import { createContext } from "react";
import * as apiCompras from "../api/compras";

export const ComprasContext = createContext();

export function ComprasProvider({ children }) {

    const getCompras = async () => {
        try {
            const response = await apiCompras.getCompras();
            return response;
        } catch (err) {
            console.error("Error obteniendo compras de entradas de eventos", err);
            return { error: err.message };
        }
    }

    return (
        <ComprasContext.Provider
            value={{
                getCompras,
            }}
        >
            {children}
        </ComprasContext.Provider>
    );
}
