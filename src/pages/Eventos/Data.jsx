import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LUGARES = [
  "Teatro Municipal",
  "Centro Cultural",
  "Club Social",
  "Estadio",
  "Salón de Eventos",
];

export default function Data() {
  const navigate = useNavigate();
  const [lugar, setLugar] = useState(LUGARES[0]);
  const [banner, setBanner] = useState(null);
  const [portada, setPortada] = useState(null);

  return (
    <div className="min-h-screen flex bg-[linear-gradient(135deg,_#010030_0%,_#00033d_50%,_#160078_100%)]">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 text-left">
            Nuevo evento
          </h2>

          <div className="mb-4">
            <button
              onClick={() => navigate(-1)}
              type="button"
              aria-label="Volver"
              className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00B4D8]/60 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm">Paso 4 de 6</span>
            </button>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Completa los datos
          </h3>

          <form className="rounded-2xl border border-white/10 bg-transparent p-6 md:p-8">
            <div className="mb-5">
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Nombre del evento
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Ingresa el nombre del evento"
                className="w-full rounded-lg border border-white/10 bg-black/30 text-white placeholder-white/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
              />
            </div>

            <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fechaInicio"
                  className="block text-sm font-medium text-gray-200 mb-1"
                >
                  Fecha inicio
                </label>
                <input
                  id="fechaInicio"
                  type="date"
                  className="w-full rounded-lg border border-white/10 bg-black/30 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="fechaFin"
                  className="block text-sm font-medium text-gray-200 mb-1"
                >
                  Fecha fin
                </label>
                <input
                  id="fechaFin"
                  type="date"
                  className="w-full rounded-lg border border-white/10 bg-black/30 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="capacidad"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Capacidad total
              </label>
              <input
                id="capacidad"
                type="number"
                min={1}
                placeholder="Ej: 500"
                className="w-full rounded-lg border border-white/10 bg-black/30 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Banner (imagen)
              </label>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="banner"
                  className="inline-flex items-center justify-center rounded-lg bg-[#00B4D8] hover:bg-[#19c6e6] text-white font-semibold px-4 py-2 cursor-pointer transition-colors"
                >
                  Elegir archivo
                </label>
                <span className="text-sm text-white/70 truncate">
                  {banner ? banner.name : "Ningún archivo seleccionado"}
                </span>
                <input
                  id="banner"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => setBanner(e.target.files?.[0] || null)}
                />
              </div>
              {banner && (
                <img
                  src={URL.createObjectURL(banner)}
                  alt="Banner preview"
                  className="mt-3 h-24 rounded-lg shadow-lg border border-white/10 object-cover"
                />
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Portada (imagen)
              </label>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="portada"
                  className="inline-flex items-center justify-center rounded-lg bg-[#00B4D8] hover:bg-[#19c6e6] text-white font-semibold px-4 py-2 cursor-pointer transition-colors"
                >
                  Elegir archivo
                </label>
                <span className="text-sm text-white/70 truncate">
                  {portada ? portada.name : "Ningún archivo seleccionado"}
                </span>
                <input
                  id="portada"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => setPortada(e.target.files?.[0] || null)}
                />
              </div>
              {portada && (
                <img
                  src={URL.createObjectURL(portada)}
                  alt="Portada preview"
                  className="mt-3 h-24 rounded-lg shadow-lg border border-white/10 object-cover"
                />
              )}
            </div>

            <div className="mb-8">
              <label
                htmlFor="lugar"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Lugar
              </label>
              <select
                id="lugar"
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/30 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
              >
                {LUGARES.map((l) => (
                  <option key={l} value={l} className="bg-[#0b0b3a]">
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                Atrás
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-[#00B4D8] hover:bg-[#19c6e6] text-white font-semibold shadow transition-colors"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
