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
  const [tickets, setTickets] = useState([]); // <-- nuevo estado de tickets

  useEffect(() => {
    getEventos();
  }, []);

  // Traer eventos de la productora
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
      const cuenta = await apiCuentaBancaria.getCuentasBancarias();
      return cuenta ? true : false;
    } catch (err) {
      setError(err.message || "Error desconocido");
      return false;
    }
  };

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

        nuevoEvento = await apiEventos.subirImagenEvento(
          nuevoEvento.id,
          formDataImages
        );
      }

      // Actualizamos evento y tickets
      setEvento(nuevoEvento);
      if (nuevoEvento?.id) {
        const ticketsData = await ticketsEvento(nuevoEvento.id);
        setTickets(ticketsData);
      }

      getEventos();
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

      // Traer tickets automáticamente
      if (data?.id) {
        const ticketsData = await ticketsEvento(data.id);
        setTickets(ticketsData);
      } else {
        setTickets([]);
      }
    } catch (err) {
      setError(err.message || "Error al obtener el evento");
      setEvento(null);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const actualizarEvento = async (id, eventoData, banner, portada) => {
    try {
      let updatedEvento = await apiEventos.actualizarEvento(id, eventoData);

      if (banner || portada) {
        const formDataImages = new FormData();
        if (banner) formDataImages.append("banner", banner);
        if (portada) formDataImages.append("portada", portada);

        updatedEvento = await apiEventos.subirImagenEvento(id, formDataImages);
      }

      setEvento(updatedEvento);

      // Traer tickets actualizados
      if (updatedEvento?.id) {
        const ticketsData = await ticketsEvento(updatedEvento.id);
        setTickets(ticketsData);
      }

      getEventos();
      return updatedEvento;
    } catch (err) {
      setError(err.message || "Error desconocido");
      return { error: err.message || "Error desconocido" };
    }
  };

  const eliminarEvento = async (id) => {
    try {
      await apiEventos.eliminarEvento(id);
      setEvento(null);
      setTickets([]); // Limpiar tickets
      getEventos();
      return true;
    } catch (err) {
      setError(err.message || "Error desconocido");
      return false;
    }
  };

  const ticketsEvento = async (eventoId) => {
    try {
      const tickets = await apiEventos.ticketsEvento(eventoId);
      return tickets;
    } catch (err) {
      setError(err.message || "Error desconocido");
      return [];
    }
  };

  return (
    <EventosContext.Provider
      value={{
        eventos,
        evento,
        loading,
        error,
        evento,
        tickets,
        getEventos,
        puedeCrearEvento,
        crearEvento,
        ticketsEvento,
        getEventoById,
        actualizarEvento,
        eliminarEvento,
      }}
    >
      {children}
    </EventosContext.Provider>
  );
}
