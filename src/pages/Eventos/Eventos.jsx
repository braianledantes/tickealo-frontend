import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";

export default function Eventos() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("activos");

  // Datos de ejemplo (reemplazar por fetch real)
  const events = [
    { id: 1, name: "Concierto Rock", status: "activos" },
    { id: 2, name: "Festival Indie", status: "finalizados" },
  ];

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchesName = e.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "todos" ? true : e.status === status;
      return matchesName && matchesStatus;
    });
  }, [events, search, status]);

  const handleNewEvent = () => {
    navigate("/eventos/nuevoevento");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#010030] via-[#00033d] to-[#160078]">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Eventos</h2>

          {/* Controles: búsqueda + estado + nuevo */}
          <div className="flex gap-4 items-center mb-8">
            {/* Búsqueda */}
            <div className="flex-1">
              <div className="relative group">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 group-focus-within:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nombre"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Filtro estado */}
            <div className="flex items-center gap-4">
              <div className="w-40">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent transition appearance-none"
                >
                  <option value="activos" className="bg-[#0b0b3a]">
                    Activos
                  </option>
                  <option value="finalizados" className="bg-[#0b0b3a]">
                    Finalizados
                  </option>
                  <option value="cancelados" className="bg-[#0b0b3a]">
                    Cancelados
                  </option>
                </select>
              </div>

              {/* Botón nuevo evento */}
              <button
                onClick={handleNewEvent}
                className="ml-2 px-4 py-2 rounded-lg bg-[#00B4D8] text-white shadow hover:bg-[#13c2e3] focus:outline-none focus:ring-2 focus:ring-[#00B4D8]/50 transition flex items-center gap-2"
              >
                <span>Evento</span>
                <span className="text-xl leading-none font-bold">+</span>
              </button>
            </div>
          </div>

          {/* Resultados */}
          <div>
            {filtered.length === 0 ? (
              <div className="text-center text-gray-400 py-20">
                No hay eventos con estos filtros, intenta con otros
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-6 transition"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {ev.name}
                    </h3>
                    <p className="text-sm text-gray-300">
                      Estado:{" "}
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          ev.status === "activos"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : ev.status === "finalizados"
                            ? "bg-zinc-500/20 text-zinc-300"
                            : "bg-amber-500/20 text-amber-300"
                        }`}
                      >
                        {ev.status}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
