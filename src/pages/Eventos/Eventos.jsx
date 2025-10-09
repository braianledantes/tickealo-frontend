import { useEffect, useState } from "react";
import EventBanner from "../../components/Eventos/EventBanner";
import EventCard from "../../components/Eventos/EventCard";
import EventLoading from "../../components/Eventos/EventLoading";
import {useAuth} from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { LayoutGrid, LayoutList} from "lucide-react";
import IconButton from "../../components/Button/IconButton";

export default function Eventos() {

  const { user, getEventosByProductora} = useAuth();
 
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("grid"); 

  useEffect(() => {
    if (!user) return;
    console.log(user);

    const fetchEventos = async () => {
      setLoading(true);
      setError(null);

      try {
        const data= await getEventosByProductora();
        setEvents(Array.isArray(data) ? data : []);
        console.log(data)
      } catch (err) {
        console.error("Error al obtener eventos:", err);
        setError(err.message || "Error desconocido");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, [user, getEventosByProductora]);


  return (
    <main className="max-w-7xl w-full mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Eventos</h2>

        {/* Botón crear evento */}
        <div className="flex gap-3">
          {/* Botones vista */}
          <div className="flex gap-2 hidden md:flex">
            <IconButton
              icon={<LayoutGrid/>}
              active={view === "grid"}
              onClick={() => setView("grid")}
            />
            <IconButton
              icon={<LayoutList />}
              active={view === "list"}
              onClick={() => setView("list")}
            />
          </div>

          <NavLink
            to="/dashboard/nuevoevento"
            className="px-4 py-2 rounded-lg bg-[#00B4D8] text-white shadow hover:bg-[#13c2e3] focus:outline-none focus:ring-2 focus:ring-[#00B4D8]/50 transition flex items-center gap-2"
          >
            <span>Evento</span>
            <span className="text-xl leading-none font-bold">+</span>
          </NavLink>
        </div>
      </div>

      {/* Contenido */}
      {loading ? (
        <EventLoading />
      ) : error ? (
        <div className="text-center text-red-500 py-20">{error}</div>
      ) : events.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          No hay eventos disponibles
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((ev) => (
            <EventCard key={ev.id} evento={ev} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {events.map((ev) => (
            <EventBanner key={ev.id} evento={ev} />
          ))}
        </div>
      )}
    </main>
  );
}

