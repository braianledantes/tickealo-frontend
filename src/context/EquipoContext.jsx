import { createContext} from "react";
import * as apiEquipo from "../api/equipo";

export const EquipoContext = createContext();

export function EquipoProvider({ children }) {

  const getMiembrosEquipo = async () => {
    try {
      const miembros = await apiEquipo.getEquipo();
      return miembros;
    } catch (error) {
      console.error("Error obteniendo miembros del equipo:", error);
      return [];
    }
  };

  const agregarMiembroEquipo = async (email) => {
    try {
      const response = await apiEquipo.agregarValidador(email);
      return response;
    } catch (err) {
      console.error("Error agregando validador:", err.message);
      return { error: err.message };
    }
  };

  const eliminarMiembroEquipo = async (email) => {
    try {
      const response = await apiEquipo.eliminarValidador(email);
      return response;
    } catch (err) {
      console.error("Error eliminando validador:", err.message);
      return { error: err.message };
    }
  };

  return (
    <EquipoContext.Provider
      value={{
        getMiembrosEquipo,
        agregarMiembroEquipo,
        eliminarMiembroEquipo,
      }}
    >
      {children}
    </EquipoContext.Provider>
  );
}
