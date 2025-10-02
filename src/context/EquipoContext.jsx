import { createContext, useEffect, useState } from "react";
import * as apiProductora from "../api/productora";

export const EquipoContext = createContext();

export function EquipoProvider({ children }) {

  const getMiembrosEquipo = async () => {
    const token = localStorage.getItem("TOKEN_KEY");
    try {
      const miembros = await apiProductora.getEquipo(token);
      return miembros;
    } catch (error) {
      console.error("Error obteniendo miembros del equipo:", error);
      return [];
    }
  };

  const agregarMiembroEquipo = async (email) => {
    const token = localStorage.getItem(TOKEN_KEY); 
    try {
      const response = await apiProductora.agregarValidador(email, token);
      return response;
    } catch (err) {
      console.error("Error agregando validador:", err.message);
      return { error: err.message };
    }
  };

  const eliminarMiembroEquipo = async (email) => {
    const token = localStorage.getItem(TOKEN_KEY); 
    try {
      const response = await apiProductora.eliminarValidador(email, token);
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
