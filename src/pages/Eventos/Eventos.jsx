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
    navigate('/eventos/nuevoevento');
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #010030 0%, #00033d 50%, #160078 100%)' }}>
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Eventos</h2>

          {/* Controls: search + status + nuevo evento */}
          <div className="flex gap-4 items-center mb-8">
            <div className="flex-1">
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  {/* icono lupa */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nombre"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-black/60 border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-40">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full py-3 px-4 rounded-lg bg-black/60 border border-white/10 text-gray-200"
                >
                  <option value="activos">Activos</option>
                  <option value="finalizados">Finalizados</option>
                  <option value="cancelados">Cancelados</option>
                </select>
              </div>

              <button
                onClick={handleNewEvent}
                className="ml-2 px-4 py-2 bg-[#00B4D8] text-white rounded-lg shadow hover:bg-[#90e0ef] flex items-center gap-2"
              >
                <span>Evento</span>
                <span className="text-xl font-bold">+</span>
              </button>
            </div>
          </div>


          <div>
            {filtered.length === 0 ? (
              <div className="text-center text-gray-400 py-20">
                No hay eventos con estos filtros, intenta con otros
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((ev) => (
                  <div key={ev.id} className="rounded-lg bg-white/5 p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{ev.name}</h3>
                    <p className="text-sm text-gray-300">Estado: {ev.status}</p>
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
