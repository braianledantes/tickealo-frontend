import { LayoutGrid, LayoutList } from "lucide-react";
import { NavLink } from "react-router-dom";
import IconButton from "../../components/Button/IconButton";
import EventBanner from "../../components/Eventos/EventBanner";
import EventCard from "../../components/Eventos/EventCard";
import EventLoading from "../../components/Eventos/EventLoading";
import { useEventosList } from "../../hooks/useEventosList";
import { useState } from "react";

export default function Eventos() {

  const { eventos, loading, error } = useEventosList();
  
  const [view, setView] = useState("grid"); 

  return (
    <main className="max-w-7xl w-full mx-auto p-10 ">
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
            to="/dashboard/eventos/nuevo"
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
      ) : eventos.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          No hay eventos disponibles
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
          {eventos.map((ev) => (
            <EventCard key={ev.id} evento={ev} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {eventos.map((ev) => (
            <EventBanner key={ev.id} evento={ev} />
          ))}
        </div>
      )}
    </main>
  );
}

