import { LayoutGrid, LayoutList, Filter, Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import IconButton from "../../components/Button/IconButton";
import SecondaryButton from "../../components/Button/SecondaryButton";
import EventLoading from "../../components/Eventos/EventLoading";
import EventsList from "../../components/Eventos/EventsList";
import { useEventosList } from "../../hooks/useEventosList";
import { PATHS } from "../../routes/paths";
import ErrorModal from "../../components/Modal/ErrorModal";
import { useAuth} from "../../hooks/useAuth";
import { TOUR_STEPS } from "../../constants/tour";

export default function Eventos() {
  const { eventos, loading, error } = useEventosList();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [view, setView] = useState("grid");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [filter, setFilter] = useState("todos");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (error) setShowErrorModal(true);
  }, [error]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);
  const handleEventClick = (evento) => {
    navigate(PATHS.UNEVENTO.replace(":id", evento.id));
  };

  const handleCloseErrorModal = () => setShowErrorModal(false);

  const getEventStatus = (evento) => {
    if (evento.cancelado) return "CANCELADO";
    if (new Date(evento.finAt) < new Date()) return "FINALIZADO";
    if (evento.stockEntradas <= 0) return "AGOTADO";
    return "ACTIVO";
  };

  //FILTRADO DE EVENTOS
  const filteredEventos = eventos.filter((evento) => {
    const estado = getEventStatus(evento);

    if (filter === "activo") return estado === "ACTIVO";
    if (filter === "finalizado") return estado === "FINALIZADO";
    return true;
  });

  return (
    <main className="max-w-7xl w-full mx-auto p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-3xl font-bold text-white">Eventos</h2>

        <div className="flex gap-3 items-center">
          {user.cuentaBancaria && (
            <>
              {/* Botón de filtro */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
                >
                  <Filter size={18} className="text-gray-300" />

                  <span>Estado</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setFilter("todos");
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
                        filter === "todos" ? "text-blue-400" : "text-white"
                      }`}
                    >
                      Todos
                    </button>
                    <button
                      onClick={() => {
                        setFilter("activo");
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
                        filter === "activo" ? "text-blue-400" : "text-white"
                      }`}
                    >
                      Activo
                    </button>
                    <button
                      onClick={() => {
                        setFilter("finalizado");
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
                        filter === "finalizado" ? "text-blue-400" : "text-white"
                      }`}
                    >
                      Finalizado
                    </button>
                  </div>
                )}
              </div>

              {/* Botones de vista */}
              <div className="hidden md:flex gap-2">
                <IconButton
                  icon={<LayoutGrid />}
                  active={view === "grid"}
                  onClick={() => setView("grid")}
                  aria-label="Cambiar a vista de cuadrícula"
                />
                <IconButton
                  icon={<LayoutList />}
                  active={view === "list"}
                  onClick={() => setView("list")}
                  aria-label="Cambiar a vista de lista"
                />
              </div>
            </>
          )}
          {/* Botón crear evento */}
          <div data-tour={TOUR_STEPS.CREATE_EVENT}>
          <SecondaryButton disabled={!user.cuentaBancaria}>
            {user.cuentaBancaria ? (
              <NavLink
                to="/dashboard/eventos/nuevo"
                className="flex gap-2 items-center"
              >
                <span className="uppercase">crear evento</span>
                <Plus />
              </NavLink>
            ) : (
              <span className="flex gap-2 items-center cursor-not-allowed">
                <span className="uppercase">crear evento</span>
                <Plus />
              </span>
            )}
          </SecondaryButton>
          </div>
        </div>
      </div>

      {/* Contenido */}
      {loading ? (
        <EventLoading />
      ) : (
        <>
          <EventsList
            viewType={view}
            eventos={filteredEventos}
            onEventClick={handleEventClick}
          />
        </>
      )}

      {/* Modal de Error */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={handleCloseErrorModal}
        error={error}
        title="Error al cargar eventos"
      />
    </main>
  );
}
