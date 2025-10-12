import { LayoutGrid, LayoutList } from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import IconButton from "../../components/Button/IconButton";
import SecondaryButton from "../../components/Button/SecondaryButton";
import EventLoading from "../../components/Eventos/EventLoading";
import EventsList from "../../components/Eventos/EventsList";
import { useEventosList } from "../../hooks/useEventosList";
import { PATHS } from "../../routes/paths";
import ErrorModal from "../../components/Modal/ErrorModal";

export default function Eventos() {
  const { eventos, loading, error } = useEventosList();
  const navigate = useNavigate();

  const [view, setView] = useState("grid");
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Mostrar modal de error cuando hay un error
  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    }
  }, [error]);

  const handleEventClick = (evento) => {
    navigate(PATHS.UNEVENTO.replace(':id', evento.id));
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <main className="max-w-7xl w-full mx-auto p-10 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Eventos</h2>

        {/* Botón crear evento */}
        <div className="flex gap-3">
          {/* Botones vista */}
          <div className="hidden md:flex gap-2">
            <IconButton
              icon={<LayoutGrid />}
              active={view === "grid"}
              onClick={() => setView("grid")}
            />
            <IconButton
              icon={<LayoutList />}
              active={view === "list"}
              onClick={() => setView("list")}
            />
          </div>

          <SecondaryButton>
            <NavLink
              to="/dashboard/eventos/nuevo"
              className="flex gap-2 items-center"
            >
              <span className="uppercase">crear evento</span>
              <span className="text-xl leading-none font-bold">+</span>
            </NavLink>
          </SecondaryButton>

        </div>
      </div>

      {/* Contenido */}
      {loading ? (
        <EventLoading />
      ) : (
        <EventsList viewType={view} eventos={eventos} onEventClick={handleEventClick} />
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

