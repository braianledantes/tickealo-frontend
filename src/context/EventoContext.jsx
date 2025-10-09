import { createContext } from "react";
import * as apiEventos from "../api/eventos";

export const EventoContext = createContext();

export function EventoProvider({ children }) {
    const crearEvento = async (formData) => {

        try {
          return await apiEventos.crearEvento(formData);
        } catch (err) {
          console.error("Error creando evento:", err);
          return { error: err.message };
        }
    };
    
    const subirImagenEvento = async (eventoId, formDataImages) => {
        try {
          return await apiEventos.subirImagenEvento(eventoId, formDataImages);
        } catch (err) {
          console.error("Error subiendo imágenes:", err);
          return { error: err.message };
        }
    };
    
    const getEventos = async () => {
        try {
            return await apiEventos.getEventos();
        } catch (err) {
            console.error("Error obteniendo eventos:", err);
            return [];
        }
    };

    const actualizarEvento = async (eventoId, updateFormData) => {
        try {
            return await apiEventos.actualizarEvento(eventoId, updateFormData);
        } catch (err) {
            console.error("Error al actulizar un evento:", err);
            return {error: err.message };
        }
    }

    const eliminarEvento = async (eventoId) => {
        try {
            return await apiEventos.eliminarEvento(eventoId);
        } catch (err) {
            console.error("Error al eliminar un evento:", err);
            return {error: err.message};
        }
    }

    return (
        <EventoContext.Provider
            value={{
                crearEvento,
                subirImagenEvento,
                getEventos,
                actualizarEvento,
                eliminarEvento,
            }}
        >
            {children}
        </EventoContext.Provider>
    );
}
