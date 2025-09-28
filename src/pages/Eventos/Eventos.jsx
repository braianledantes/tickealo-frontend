import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Eventos() {
  const { user, getEventos } = useContext(AuthContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener eventos de la productora logueada
  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const data = await getEventos(); // ya debería usar user.id dentro del context
        setEvents(data?.data || []); // fallback a array vacío
      } catch (err) {
        console.error("Error al obtener eventos:", err);
        setEvents([]); // fallback por seguridad
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user, getEventos]);

  const handleNewEvent = () => {
    navigate("nuevoevento");
  };

  return (
    <main className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">Eventos</h2>

      {/* Botón nuevo evento */}
      <div className="flex justify-end mb-8">
        <button
          onClick={handleNewEvent}
          className="px-4 py-2 rounded-lg bg-[#00B4D8] text-white shadow hover:bg-[#13c2e3] focus:outline-none focus:ring-2 focus:ring-[#00B4D8]/50 transition flex items-center gap-2"
        >
          <span>Evento</span>
          <span className="text-xl leading-none font-bold">+</span>
        </button>
      </div>

      {/* Resultados */}
      {loading ? (
        <div className="text-center text-gray-400 py-20">
          Cargando eventos...
        </div>
      ) : !events || events.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          No hay eventos disponibles
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-6 transition"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{ev.nombre}</h3>
              <p className="text-sm text-gray-300">
                Estado:{" "}
                <span
                  className={`px-2 py-0.5 rounded text-xs ${
                    ev.cancelado
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-emerald-500/20 text-emerald-300"
                  }`}
                >
                  {ev.cancelado ? "cancelado" : "activo"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}