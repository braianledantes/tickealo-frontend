import { createContext, useEffect, useState } from "react";
import * as apiAuth from "../api/auth";
import * as apiProductora from "../api/productora";
import { useAuth } from "../hooks/useAuth";

export const PerfilContext = createContext();

export function PerfilProvider({ children }) {
  const { user, actualizarPerfilProductora } = useAuth();
  console.log("User in PerfilProvider:", user);

  const [cantEventos, setCantEventos] = useState(0);
  const [cantValidadores, setCantValidadores] = useState(0);
  const [cantSeguidores, setCantSeguidores] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.role === "productora") {
      fetchCantEventos();
      fetchCantValidadores();
      fetchCantSeguidores();
    }
  }, [user]);

  const fetchCantEventos = async () => {
    try {
      const eventos = await apiProductora.getEventosByProductora();
      setCantEventos(eventos.length);
      return eventos.length;
    } catch (err) {
      console.error("Error fetching eventos:", err);
      return 0;
    }
  };

  const fetchCantValidadores = async () => {
    try {
      const validadores = await apiProductora.getEquipo();
      setCantValidadores(validadores.length);
      return validadores.length;
    } catch (err) {
      console.error("Error fetching validadores:", err);
      return 0;
    }
  };

  const fetchCantSeguidores = async () => {
    try {
      const seguidores = await apiProductora.getSeguidores();
      setCantSeguidores(seguidores.length);
      return seguidores.length;
    } catch (err) {
      console.error("Error fetching seguidores:", err);
      return 0;
    }
  };

  const actualizarPerfil = async (updateFormData) => {
    try {
      setLoading(true);
      const updatedProfile = await actualizarPerfilProductora(updateFormData);
      return updatedProfile;
    } catch (err) {
      console.error("Error updating profile:", err);
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  }

  return (
    <PerfilContext.Provider value={{
      loading,
      error,
      user,
      cantEventos,
      cantValidadores,
      cantSeguidores,
      actualizarPerfil,
    }}>
      {children}
    </PerfilContext.Provider>
  );
}