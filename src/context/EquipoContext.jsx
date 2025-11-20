import { createContext, useEffect, useState } from "react";
import * as apiEquipo from "../api/equipo";

export const EquipoContext = createContext();

export function EquipoProvider({ children }) {
  const [equipo, setEquipo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      setLoading(true);
      getMiembrosEquipo()
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
  }, []);

  const getMiembrosEquipo = async () => {
    try {
      const miembros = await apiEquipo.getEquipo();
      setEquipo(miembros);
    } catch (error) {
      setError(error);
    }
  };

  const agregarMiembroEquipo = async (email) => {
    try {
      setLoading(true);
      setError(null);

      if (!email) {
        setError("Ingresa un correo.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Ingresa un correo válido.");
        return;
      }
      const response = await apiEquipo.agregarValidador(email);
      if (response?.error) {
        setError(response.error);
        return;
      }
      await getMiembrosEquipo();

    } catch (err) {
      if (err?.response?.status === 404) {
        setError("No existe un usuario con ese correo electrónico dentro del sistema.");
      } else {
        setError("Ocurrió un error al agregar al miembro.");
      }
    } finally {
      setLoading(false);
    }
  };


  const eliminarMiembroEquipo = async (email) => {
    try {
      setLoading(true);
      const response = await apiEquipo.eliminarValidador(email);
      if (response.error) {
        setError(response.error);
      } else {
        await getMiembrosEquipo();
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EquipoContext.Provider
      value={{
        loading,
        error,
        equipo,
        agregarMiembroEquipo,
        eliminarMiembroEquipo,
      }}
    >
      {children}
    </EquipoContext.Provider>
  );
}
