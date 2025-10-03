import { createContext } from "react";
import * as apiProductora from "../api/productora";

export const ProductoraContext = createContext();

export function ProductoraProvider({ children }) {
    const getEventosByProductora = async () => {
        try {
          const eventosProductora = await apiProductora.getEventosByProductora();
          return eventosProductora;
        } catch (err) {
          console.error("Error obteniendo eventos de productora:", err);
          return [];
        }
    }

    const getEquipo = async () => {
        try {
            const response = await apiProductora.getEquipo();
            return response;
        } catch (err) {
            console.error("Error obteniendo equipo de Productora");
            return { error: err.message };
        }
    }

    const getSeguidores = async () => {
        try {
            const response = await apiProductora.getSeguidores();
            return response;
        } catch (err) {
            console.error("Error obteniendo seguidores de Productora");
            return { error: err.message };
        }
    }

    return (
        <ProductoraContext.Provider
            value={{
                getEventosByProductora,
                getEquipo,
                getSeguidores,
            }}
        >
            {children}
        </ProductoraContext.Provider>
    );
}
