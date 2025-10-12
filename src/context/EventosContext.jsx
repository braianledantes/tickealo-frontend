import { createContext, useEffect, useState } from "react";
import * as apiEventos from "../api/eventos";
import * as apiProductora from "../api/productora";
import * as apiCuentaBancaria from "../api/cuentaBancaria";

export const EventosContext = createContext();

export function EventosProvider({ children }) {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [evento, setEvento] = useState(null);

  useEffect(() => {
    getEventos();
  }, []);

  const getEventos = async () => {
    setLoading(true);
    try {
      const data = await apiProductora.getEventosByProductora();
      setEventos(data);
    } catch (err) {
      setError(err.message || "Error desconocido");
      setEventos([]);
    } finally {
      setLoading(false);
    }
  };

  const puedeCrearEvento = async () => {
    try {
      const cuenta =  await apiCuentaBancaria.getCuentasBancarias();
      return cuenta ? true : false;
    } catch (err) {
      setError(err.message || "Error desconocido");
      return false;
    }
  }

  const crearEvento = async (eventoData, banner, portada) => {
    try {
      let nuevoEvento = await apiEventos.crearEvento(eventoData);

      if (!nuevoEvento || nuevoEvento.error) {
        const errorMsg = nuevoEvento?.error || "Error al crear evento";
        setError(errorMsg);
        return { error: errorMsg };
      }

      if (banner || portada) {
        const formDataImages = new FormData();
        if (banner) formDataImages.append("banner", banner);
        if (portada) formDataImages.append("portada", portada);

        nuevoEvento = await apiEventos.subirImagenEvento(nuevoEvento.id, formDataImages);
        setEvento(nuevoEvento);
        getEventos();
      }
      return nuevoEvento;
    } catch (err) {
      setError(err.message || "Error desconocido");
      return { error: err.message || "Error desconocido" };
    }
  };

  const getEventoById = async (id) => {
    setLoading(true);
    try {
      const data = await apiEventos.getEventoById(id);
      setEvento(data);
    } catch (err) {
      setError(err.message || "Error desconocido");
      setEvento(null);
    } finally {
      setLoading(false);
    }
  }

  const actualizarEvento = async (id, eventoData, banner, portada) => {
    try {
      let updatedEvento = await apiEventos.actualizarEvento(id, eventoData);

      if (banner || portada) {
        const formDataImages = new FormData();
        if (banner) formDataImages.append("banner", banner);
        if (portada) formDataImages.append("portada", portada);

        updatedEvento = await apiEventos.subirImagenEvento(id, formDataImages);
        setEvento(updatedEvento);
        getEventos();
      }
    } catch (err) {
      setError(err.message || "Error desconocido");
      return { error: err.message || "Error desconocido" };
    }
  };

  const eliminarEvento = async (id) => {
    try {
      await apiEventos.eliminarEvento(id);
      setEvento(null);
      getEventos();
      return true;
    } catch (err) {
      setError(err.message || "Error desconocido");
      return false;
    }
  };

  return (
    <EventosContext.Provider
      value={{
        eventos,
        loading,
        error,
        evento,
        getEventos,
        puedeCrearEvento,
        crearEvento,
        getEventoById,
        actualizarEvento,
        eliminarEvento,
      }}
    >
      {children}
    </EventosContext.Provider>
  );
}