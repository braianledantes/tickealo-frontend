import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, ChartColumn } from "lucide-react";
import { getEventoById } from "../../api/eventos";
import EventDetail from "../../components/Eventos/EventDetail";
import EventModified from "../../components/Eventos/EventModified";
import EventLoading from "../../components/Eventos/EventLoading";
import MiembrosList from "../../components/Eventos/MiembroList";
import LoadingSpinner from "../../components/LoadingSpinner";
import useEvento from "../../hooks/useEventos";
import useEquipo from "../../hooks/useEquipo";
import IconInput from "../../components/Input/IconInput";

export default function UnEvento() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getMiembrosEquipo } = useEquipo();
  const { subirImagenEvento, actualizarEvento, eliminarEvento } = useEvento();

  const [evento, setEvento] = useState(null);
  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const dataEvento = await getEventoById(id);
        setEvento(dataEvento);

        const dataValidadores = await getMiembrosEquipo();
        setMiembros(dataValidadores || []);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los datos del evento o validadores");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        entradas: dataEvento.entradas,
        cuentaBancariaId: dataEvento.cuentaBancariaId || 1,
      };

      const res = await actualizarEvento(evento.id, payload);

      if (res?.error) {
        alert("Error actualizando evento: " + res.error);
        return;
      }

      if (banner || portada) {
        const formDataImages = new FormData();
        if (banner) formDataImages.append("banner", banner);
        if (portada) formDataImages.append("portada", portada);

        await subirImagenEvento(evento.id, formDataImages);
      }

      setEvento((prev) => ({ ...prev, ...payload }));

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

  if (showChart) {
    console.log(
      "No está queriendo renderizar nada, solo que no está hecha la página jeje"
    );
  }

  return (
    <div className="max-w-7xl w-full mx-auto px-4">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-4">
        <h2 className="text-3xl font-bold text-white">
          {evento?.nombre}{" "}
        </h2>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4">
          <IconInput
            icon={<Pencil />}
            active={editing}
            onClick={() => {
              setEditing((prev) => !prev);
              setShowChart(false); 
            }}
          />
          <IconInput
            icon={<ChartColumn />}
            active={showChart}
            onClick={() => {
              setShowChart((prev) => !prev);
              setEditing(false); 
            }}
          />
        </div>
      </div>

      {/** SUBTITULO */}
      <div className=" mb-4">
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
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        <div className="lg:col-span-7">
          {showChart ? (
            <EventLoading type="detail" />
          ) : editing ? (
            <EventModified evento={evento} onUpdate={handleActualizar}  />
          ) : (
            <EventDetail evento={evento} onDelete={() => handleDelete(evento.id)} />
          )}
        </div>

        {/* Columna derecha - Validadores */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#05081b]/40 p-6">
            <MiembrosList
              miembros={miembros || []}
              text="VALIDADORES DEL EVENTO"
              onEliminar={null}
              loading={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
