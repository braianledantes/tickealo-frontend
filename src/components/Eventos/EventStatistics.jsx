import { BarChart3, Globe2, Ticket } from "lucide-react";

export default function EstadisticasEvento({ evento }) {
  if (!evento) {
    return (
      <p className="text-gray-400 text-center py-10">
        No hay datos disponibles para este evento.
      </p>
    );
  }

  // Datos del backend
  const capacidadTotal = evento.capacidad || 0;
  const stockActual = evento.stockEntradas || 0;
  const totalVendidas = Math.max(capacidadTotal - stockActual, 0);
  const porcentaje = capacidadTotal
    ? Math.min(Math.round((totalVendidas / capacidadTotal) * 100), 100)
    : 0;

  const totalRecaudado = evento.entradas?.length
    ? evento.entradas.reduce((acc, entrada) => {
        const vendidas = Math.max(entrada.cantidad - entrada.stock, 0);
        return acc + entrada.precio * vendidas;
      }, 0)
    : 0;

  return (
    <div className="bg-[#05081b]/60 border border-white/10 rounded-xl shadow-lg p-8 text-gray-200">
      {/*Recaudación global */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-[#4da6ff] mb-1">
          ${totalRecaudado.toLocaleString("es-AR")}
        </h2>
        <p className="text-sm flex items-center justify-center gap-2 text-gray-400">
          <Globe2 size={16} className="text-[#0077B6]" />
          Recaudación total
        </p>
      </div>

      <div className="border-t border-white/10 pt-4 mt-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Ticket size={18} className="text-[#0077B6]" />
            <span className="font-semibold text-white">Entradas vendidas</span>
          </div>
          <span className="font-semibold text-[#4da6ff]">
            {totalVendidas} de {capacidadTotal}
          </span>
        </div>

        <div className="w-full bg-white/10 h-2 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#0077B6] to-[#4da6ff] h-full transition-all duration-700"
            style={{ width: `${porcentaje}%` }}
          ></div>
        </div>

        <p className="text-xs text-gray-500 mt-1 text-right">
          {porcentaje}% vendidas
        </p>
      </div>

      <div className="border-t border-white/10 my-6" />

      {/* Reportes */}
      <div className="flex justify-center">
        <button className="flex items-center gap-2 text-sm text-[#4da6ff] hover:text-white transition-colors">
          <BarChart3 size={16} />
          Reportes
        </button>
      </div>
    </div>
  );
}
