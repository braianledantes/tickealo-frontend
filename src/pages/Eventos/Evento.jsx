import { ChartColumn, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "../../components/Button/IconButton";
import EventDetail from "../../components/Eventos/EventDetail";
import EventTickets from "../../components/Eventos/EventTickets";
import EventLoading from "../../components/Eventos/EventLoading";
import EventModified from "../../components/Eventos/EventModified";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useEventosList } from "../../hooks/useEventosList";
import EstadisticasEvento from "../../components/Eventos/EventStatistics";
import ReseñasEvento from "../../components/Eventos/EventComents";

export default function Evento() {
  const { id } = useParams();
  const {
    evento,
    getEventoById,
    loading,
    error,
    actualizarEvento,
    actualizarImagenesEvento,
    eliminarEvento,
<<<<<<< Updated upstream
    tickets,
=======
>>>>>>> Stashed changes
  } = useEventosList();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [activeTab, setActiveTab] = useState("estadisticas");

  useEffect(() => {
    if (id) getEventoById(id);
  }, [id]);

  const handleActualizar = async (dataEvento, banner, portada) => {
    try {
      const payload = {
        nombre: dataEvento.nombre,
        descripcion: dataEvento.descripcion,
        inicioAt: new Date(dataEvento.inicioAt).toISOString(),
        finAt: new Date(dataEvento.finAt).toISOString(),
        cancelado: dataEvento.cancelado ?? false,
        lugar: dataEvento.lugar,
      };

      const res = await actualizarEvento(evento.id, payload, banner, portada);

      if (res?.error) {
        alert("Error actualizando evento: " + res.error);
        return;
      }

      if (banner || portada) {
        const formDataImages = new FormData();
        if (banner) formDataImages.append("banner", banner);
        if (portada) formDataImages.append("portada", portada);
        await actualizarImagenesEvento(evento.id, formDataImages);
      }

      alert("Evento actualizado correctamente");
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al actualizar el evento");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que querés eliminar este evento?")) {
      const res = await eliminarEvento(id);
      if (!res?.error) navigate("/dashboard/eventos");
      else alert("Error eliminando evento: " + res.error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!evento) return <p className="text-white">Evento no encontrado</p>;
<<<<<<< Updated upstream
console.log("Tickets del evento:", tickets);
=======

  const getEventStatus = (evento) => {
    if (evento.cancelado) return "CANCELADO";
    if (new Date(evento.finAt) < new Date()) return "FINALIZADO";
    if (evento.stockEntradas <= 0) return "AGOTADO";
    return "ACTIVO";
  };

  const estadoEvento = getEventStatus(evento);
  const esFinalizado =
    estadoEvento === "FINALIZADO" || estadoEvento === "CANCELADO";
>>>>>>> Stashed changes

  return (
    <div className=" max-w-4xl mx-auto p-10">
      {/* Header */}
<<<<<<< Updated upstream
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-4 ">
        <h2 className="text-3xl font-bold text-white">
          {evento?.nombre}{" "}
        </h2>
=======
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-4">
        <h2 className="text-3xl font-bold text-white">{evento?.nombre}</h2>
        {esFinalizado && (
          <p className="text-sm text-yellow-400 mt-1">
            Este evento está finalizado y no puede editarse. Solo se muestran
            las estadísticas y reseñas.
          </p>
        )}
>>>>>>> Stashed changes

        {/* Botones de acción */}
        <div className="flex justify-end gap-4">
          <IconButton
            icon={<Pencil />}
            title={
              esFinalizado ? "Este evento no se puede editar" : "Editar Evento"
            }
            active={editing}
            disabled={esFinalizado}
            onClick={() => {
              if (!esFinalizado) {
                setEditing((prev) => !prev);
                setShowChart(false);
              }
            }}
          />
          <IconButton
            icon={<ChartColumn />}
            title="Estadísticas / Reseñas"
            active={showChart}
            onClick={() => {
              setShowChart((prev) => !prev);
              setEditing(false);
            }}
          />
        </div>
      </div>

      {/* Subtítulo */}
      <div className="mb-4">
        {editing ? (
          <span className="font-bold text-sm text-[#A5A6AD] tracking-wide">
            MODO EDICIÓN
          </span>
        ) : showChart ? (
          <span className="font-bold text-sm text-[#0077B6] tracking-wide">
            ESTADÍSTICAS Y RESEÑAS
          </span>
        ) : null}
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto">
        {showChart ? (
<<<<<<< Updated upstream
          <EventTickets evento={evento} tickets={tickets} />
=======
          <div className="border border-white/10 bg-[#05081b]/40 rounded-xl p-6 space-y-8 shadow-lg">
            <div className="flex justify-center gap-6 mb-4 border-b border-white/10 pb-2">
              <button
                className={`text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ${
                  activeTab === "estadisticas"
                    ? "text-[#0077B6] border-b-2 border-[#0077B6]"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("estadisticas")}
              >
                Estadísticas del evento
              </button>

              <button
                className={`text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ${
                  activeTab === "reseñas"
                    ? "text-[#0077B6] border-b-2 border-[#0077B6]"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("reseñas")}
              >
                Reseñas del evento
              </button>
            </div>

            {activeTab === "estadisticas" && (
              <EstadisticasEvento evento={evento} />
            )}
            {activeTab === "reseñas" && <ReseñasEvento evento={evento} />}
          </div>
>>>>>>> Stashed changes
        ) : editing ? (
          <EventModified evento={evento} onUpdate={handleActualizar} />
        ) : (
          <EventDetail
            evento={evento}
            onDelete={() => handleDelete(evento.id)}
          />
        )}
      </div>
    </div>
  );
}
