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
    tickets,
  } = useEventosList();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (id) {
      getEventoById(id);
    }
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
      if (!res?.error) {
        navigate("/dashboard/eventos");
      } else {
        alert("Error eliminando evento: " + res.error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!evento) return <p className="text-white">Evento no encontrado</p>;
console.log("Tickets del evento:", tickets);

  return (
    <div className=" max-w-4xl mx-auto p-10">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-4 ">
        <h2 className="text-3xl font-bold text-white">
          {evento?.nombre}{" "}
        </h2>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4">
          <IconButton
            icon={<Pencil />}
            title="Editar Evento"
            active={editing}
            onClick={() => {
              setEditing((prev) => !prev);
              setShowChart(false);
            }}
          />
          <IconButton
            icon={<ChartColumn />}
            title="Estadisticas del Evento"
            active={showChart}
            onClick={() => {
              setShowChart((prev) => !prev);
              setEditing(false);
            }}
          />
        </div>
      </div>

      {/** SUBTITULO */}
      <div className="mb-4">
        {editing ? (
          <span className="font-bold text-sm text-[#A5A6AD] tracking-wide">
            MODO EDICIÓN
          </span>
        ) : showChart ? (
          <span className="font-bold text-sm text-[#0077B6] tracking-wide">
            ESTADÍSTICAS DEL EVENTO
          </span>
        ) : null}
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto">
        {showChart ? (
          <EventTickets evento={evento} tickets={tickets} />
        ) : editing ? (
          <EventModified evento={evento} onUpdate={handleActualizar} />
        ) : (
          <EventDetail evento={evento} onDelete={() => handleDelete(evento.id)} />
        )}
      </div>
    </div>
  );
}
