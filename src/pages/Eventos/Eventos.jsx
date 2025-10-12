import { LayoutGrid, LayoutList } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import IconButton from "../../components/Button/IconButton";
import EventLoading from "../../components/Eventos/EventLoading";
import EventsList from "../../components/Eventos/EventsList";
import { useEventosList } from "../../hooks/useEventosList";
import { PATHS } from "../../routes/paths";

export default function Eventos() {
  const { eventos, loading, error } = useEventosList();
  const navigate = useNavigate();
  
  const [view, setView] = useState("grid");

  const handleEventClick = (evento) => {
    navigate(PATHS.UNEVENTO.replace(':id', evento.id));
  };

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
      ) : <EventsList viewType={view} eventos={eventos} onEventClick={handleEventClick} />
      }
    </main>
  );
}

