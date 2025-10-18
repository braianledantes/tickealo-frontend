import React from "react";

export default function ProgressTicket({ evento, ticketsTotalesEvento = [] }) {
  if (!evento) {
    return <span className="text-gray-400">Cargando información del evento...</span>;
  }

  const entradas = evento.entradas ?? [];
  const totalCapacidad = evento.capacidad ?? 0;
  const stockRestante = evento.stockEntradas ?? 0;

  if (entradas.length === 0) {
    return <span className="text-gray-400">No se encontraron entradas para este evento.</span>;
  }

  // Tickets por estado
  const ticketsPendientes = ticketsTotalesEvento.filter(t => t.estado === "PENDIENTE_VALIDACION");
  const ticketsRechazados = ticketsTotalesEvento.filter(t => t.estado === "ANULADA");
  const ticketsValidadosTotales = ticketsTotalesEvento.filter(t => t.estado === "VALIDADO");

  // Total vendidos
  const totalVendidos = totalCapacidad - stockRestante;

  // Entradas por tipo con cantidad vendida y stock
  const entradasPorTipo = {};
  entradas.forEach(e => {
    const stock = e.cantidad ?? 0;
    const vendidos = stock - (e.stock ?? 0);
    entradasPorTipo[e.tipo] = { vendidos, stock };
  });

  const porcentajeEvento = totalCapacidad > 0
    ? Math.round((ticketsValidadosTotales.length / totalCapacidad) * 100)
    : 0;

  return (
    <div className="mt-6">
      {/* Progreso total del evento */}
      <div className="bg-[#0c0f2b] p-5 rounded-3xl shadow-md mb-4">
        <span className="text-[#7a86b6] text-lg font-bold mb-2 block">Progreso total del evento</span>

        <div className="flex justify-between mb-2">
          <span className="text-gray-300 text-sm">
            {ticketsValidadosTotales.length} / {totalCapacidad} tickets
          </span>
          <span className="text-[#4da6ff] font-bold text-sm">
            {porcentajeEvento}%
          </span>
        </div>

        {/* Barra de progreso */}
        <div className="w-full h-4 bg-[#1b1b40] rounded-full overflow-hidden">
          <div
            style={{
              width: `${porcentajeEvento}%`,
              height: "100%",
              borderRadius: "8px",
              background: "linear-gradient(to right, #03055F, #00B4D8, #90E0EF, #CAF0F8)"
            }}
          />
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="mt-4 space-y-2 px-2">
        <div className="flex justify-between">
          <span className="font-bold text-gray-400 text-md">Pendientes</span>
          <span className="font-bold text-gray-400 text-md">{ticketsPendientes.length}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-bold text-gray-400 text-md">Rechazados</span>
          <span className="font-bold text-gray-400 text-md">{ticketsRechazados.length}</span>
        </div>

        {/* Tickets por tipo (tipo | vendidos / stock) */}
        {Object.entries(entradasPorTipo).map(([tipo, { vendidos, stock }]) => (
          <div key={tipo} className="flex justify-between">
            <span className="font-bold text-gray-300 text-md">{tipo}</span>
            <span className="font-bold text-[#4da6ff] text-md">{vendidos} / {stock}</span>
          </div>
        ))}

        <div className="flex justify-between">
          <span className="font-bold text-[#7a86b6] text-md">Total vendidos</span>
          <span className="font-bold text-[#7a86b6] text-md">{totalVendidos}</span>
        </div>
      </div>
    </div>
  );
}
