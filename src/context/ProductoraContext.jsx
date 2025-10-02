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

    return (
        <ProductoraContext.Provider
            value={{
            }}
        >
            {children}
        </ProductoraContext.Provider>
    );
}
