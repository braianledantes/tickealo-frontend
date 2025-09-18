import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LUGARES = [
  "Teatro Municipal",
  "Centro Cultural",
  "Club Social",
  "Estadio",
  "Salón de Eventos",
];

export default function Data () {
    const navigate = useNavigate();
    const [lugar, setLugar] = useState(LUGARES[0]);
    const [banner, setBanner] = useState(null);
    const [portada, setPortada] = useState(null);

    return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #010030 0%, #00033d 50%, #160078 100%)' }}>
      <Sidebar />

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-white mb-6 text-left">Nuevo evento</h2>
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="text-white text-2xl hover:text-purple-400 focus:outline-none"
              aria-label="Volver"
              type="button"
            >
              ←
            </button>
            <span className="text-sm text-white/80">Paso 4 de 6</span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-6">Completa los datos</h2>
          
          <form className="rounded-lg p-6 shadow-md bg-[#010030] border border-white/10">
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-200">
                Nombre del evento
              </label>
              <input
                type="text"
                id="nombre"
                className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm p-2 bg-black/40 text-white placeholder-gray-400"
                placeholder="Ingresa el nombre del evento"
              />
            </div>

            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-200">
                  Fecha inicio
                </label>
                <input
                  type="date"
                  id="fechaInicio"
                  className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm p-2 bg-black/40 text-white"
                />
              </div>
              <div>
                <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-200">
                  Fecha fin
                </label>
                <input
                  type="date"
                  id="fechaFin"
                  className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm p-2 bg-black/40 text-white"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="capacidad" className="block text-sm font-medium text-gray-200">
                Capacidad total
              </label>
              <input
                type="number"
                id="capacidad"
                min={1}
                className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm p-2 bg-black/40 text-white"
                placeholder="Ej: 500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="banner" className="block text-sm font-medium text-gray-200 mb-1">
                Banner (imagen)
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="banner"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={e => setBanner(e.target.files[0])}
                />
                <label
                  htmlFor="banner"
                  className="inline-block bg-[#00B4D8] hover:bg-[#90e0ef] text-white font-semibold px-4 py-2 rounded-lg cursor-pointer transition text-center"
                >
                  Elegir archivo
                </label>
              </div>
              {banner && (
                <img
                  src={URL.createObjectURL(banner)}
                  alt="Banner preview"
                  className="mt-2 h-24 rounded shadow"
                />
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="portada" className="block text-sm font-medium text-gray-200 mb-1">
                Portada (imagen)
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="portada"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={e => setPortada(e.target.files[0])}
                />
                <label
                  htmlFor="portada"
                  className="inline-block bg-[#00B4D8] hover:bg-[#90e0ef] text-white font-semibold px-4 py-2 rounded-lg cursor-pointer transition text-center"
                >
                  Elegir archivo
                </label>
              </div>
              {portada && (
                <img
                  src={URL.createObjectURL(portada)}
                  alt="Portada preview"
                  className="mt-2 h-24 rounded shadow"
                />
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="lugar" className="block text-sm font-medium text-gray-200">
                Lugar
              </label>
              <select
                id="lugar"
                value={lugar}
                onChange={e => setLugar(e.target.value)}
                className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm p-2 bg-black/40 text-white"
              >
                {LUGARES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#00B4D8] hover:bg-[#90e0ef] text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
    )
}
