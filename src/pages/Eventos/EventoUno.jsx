import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Pencil, ChartColumn } from "lucide-react";
import { getEventoById } from "../../api/eventos";
import EventDetail from "../../components/Eventos/EventDetail";
import EventModified from "../../components/Eventos/EventModified";
import EventLoading from "../../components/Eventos/EventLoading";
import MiembrosList from "../../components/Eventos/MiembroList";
import { AuthContext } from "../../context/AuthContext";
import IconInput from "../../components/Input/IconInput";

export default function UnEvento() {
  const { id } = useParams();
  const { getMiembrosEquipo } = useContext(AuthContext);

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
        console.log("Validadores de la productora:", dataValidadores);
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

  if (loading) return <p className="text-white">Cargando evento...</p>;
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
          {editing ? (
            <span className="text-sm ml-2 text-[#A5A6AD] tracking-wide">
              MODO EDICIÓN
            </span>
          ) : showChart ? (
            <span className="text-sm ml-2 text-[#0077B6] tracking-wide">
              ESTADÍSTICAS DEL EVENTO
            </span>
          ) : null}
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

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        <div className="lg:col-span-7">
          {showChart ? (
            <EventLoading type="detail" />
          ) : editing ? (
            <EventModified evento={evento} />
          ) : (
            <EventDetail evento={evento} />
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
