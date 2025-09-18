import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Nuevoevento() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #010030 0%, #00033d 50%, #160078 100%)' }}>
      <Sidebar />

      <main className="flex-1 p-6">
        {/* Top bar */}
        <h2 className="text-3xl font-bold text-white mb-6">Nuevo evento</h2>

        <div className="p-6 max-w-4xl mx-auto">
          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-white/80 hover:text-white flex items-center gap-2"
            >
              <span className="text-2xl">←</span>
              <span className="text-sm">Paso 1 de 6</span>
            </button>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Elegí el tipo de evento</h1>

          <div className="rounded-xl overflow-hidden">
            <div className="bg-black/70 border border-white/10 rounded-xl p-6 flex items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="inline-flex items-center justify-center rounded-full bg-[#00B4D8] text-white px-3 py-1 text-sm font-semibold mr-2">
                  Con venta
                </span>

                <div>
                  <p className="text-gray-300 max-w-3xl leading-relaxed">
                    Define un precio y stock para tus entradas. Véndelas por Tikzet o gestiona el pago tú mismo.
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => { navigate('/eventos/metodopago'); }}
                  aria-label="Seleccionar Con venta"
                  className="text-white/90 hover:text-white p-3 rounded-full bg-transparent"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}