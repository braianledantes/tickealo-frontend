import { createContext, useEffect, useState } from "react";
import * as apiEventos from "../api/eventos";
import * as apiProductora from "../api/productora";
import * as apiCuentaBancaria from "../api/cuentaBancaria";
import { useAuth } from "../hooks/useAuth";

export const EventosContext = createContext();

export function EventosProvider({ children }) {
  const { user } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [evento, setEvento] = useState(null);
  const [tickets, setTickets] = useState([]); 
  const [allEvents, setAllEvents] =useState([]);
  const [eventosPasados, setEventosPasados] = useState([]);
  const [ loadingAllEvents, setLoadingAllEvents] = useState(false);

  const isProductora = !!user?.user?.roles?.some(
    (role) => role.name === "productora",
  );
  
  useEffect(() => {
    if (user && isProductora) {
      getEventos();
    }
    // eslint-disable-next-line
  }, [user]);

  const getAllEvents = async () => {
    setLoadingAllEvents(true);
    try {
      const data = await apiEventos.getEventos();
      const ordenados = data.sort((a, b) => {
        const fechaA = new Date(a.inicioAt);
        const fechaB = new Date(b.inicioAt);
        return fechaA - fechaB; 
      });

      const futuros = ordenados.filter(event => {
        const fechaEvento = new Date(event.inicioAt);
        return fechaEvento >= new Date(); 
      });

      const pasados = ordenados
        .filter(event => {
          const fechaEvento = new Date(event.inicioAt);
          return fechaEvento < new Date(); 
        })
        .sort((a, b) => new Date(b.inicioAt) - new Date(a.inicioAt));

      setAllEvents(futuros);
      setEventosPasados(pasados);
    } catch (err) {
      setError(err.message || "Error desconocido");
      setAllEvents([]);
      setEventosPasados([]);
    } finally {
      setLoadingAllEvents(false);
    }
  };


  // Traer eventos de la productora
  const getEventos = async () => {
    setLoading(true);
    try {
      const data = await apiProductora.getEventosByProductora();
      const eventosOrdenados = data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setEventos(eventosOrdenados);
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
      const response = await apiEventos.ticketsEvento(eventoId);

      // const tickets = response.tickets || [];
      // const ticketsValidados = tickets.filter(
      //   (t) => t.estado?.toUpperCase() === "VALIDADO"
      // );

      // return ticketsValidados;
      return response;
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
        eventosPasados,
        tickets,
        getEventos,
        puedeCrearEvento,
        crearEvento,
        ticketsEvento,
        getEventoById,
        actualizarEvento,
        eliminarEvento,
        allEvents,
        loadingAllEvents, 
        getAllEvents,
      }}
    >
      {children}
    </EventosContext.Provider>
  );
}
