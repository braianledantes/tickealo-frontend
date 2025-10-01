export default function PrimerPasoLoading() {
  return (
    <div className="mb-20 max-w-5xl mx-auto animate-pulse">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
        1. Completa los datos
      </h3>

      <div className="rounded-2xl border border-white/10 bg-[#05081b]/40 overflow-hidden">
        {/* Banner fake */}
        <div className="w-full aspect-[11/4] bg-gray-700/40" />

        <div className="relative p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            {/* Columna 1: Ubicación y Mapa (placeholder cuadrado) */}
            <div className="flex-1 min-h-[320px] bg-gray-700/40 rounded-xl" />

            {/* Columna 2: Inputs fake */}
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-6">
                <div className="h-12 bg-gray-700/40 rounded-xl" />
                <div className="h-12 bg-gray-700/40 rounded-xl" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-12 bg-gray-700/40 rounded-xl" />
                  <div className="h-12 bg-gray-700/40 rounded-xl" />
                </div>
              </div>
            </div>

            {/* Botón placeholder */}
            <div className="absolute bottom-8 right-4 mt-8 w-[80px] h-12 bg-gray-700/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
