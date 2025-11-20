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

  // Entradas por tipo con cantidad vendida, stock y validados
  const entradasPorTipo = {};
  entradas.forEach(e => {
    const stock = e.cantidad ?? 0;
    const vendidos = stock - (e.stock ?? 0);

    // Contar tickets validados de este tipo usando ticket.entrada.tipo
    const validados = ticketsTotalesEvento.filter(
      t => t.estado === "VALIDADO" && t.entrada?.tipo === e.tipo
    ).length;

    entradasPorTipo[e.tipo] = { vendidos, stock, validados };
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
            {ticketsValidadosTotales.length} / {totalCapacidad} Tickets validados
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
              background: "linear-gradient(to right, #90E0EF, #CAF0F8)"
            }}
          />
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="mt-4 space-y-2 px-2">
        <h1 className="text-white/70 tracking-wider italic">TICKETS</h1>
        <div className="flex justify-between">
          <span className="font-bold text-gray-400 text-md">Pendientes de validación</span>
          <span className="font-bold text-gray-400 text-md">{ticketsPendientes.length}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-bold text-gray-400 text-md">Rechazados</span>
          <span className="font-bold text-gray-400 text-md">{ticketsRechazados.length}</span>
        </div>

        {/* Entradas por tipo con validados / stock */}
        {Object.entries(entradasPorTipo).map(([tipo, { validados, stock }]) => (
          <div key={tipo} className="flex justify-between">
            <span className="font-bold text-gray-300 text-md">{tipo}</span>
            <span className="font-bold text-[#4da6ff] text-md">{validados} / {stock}</span>
          </div>
        ))}

        <h1 className="text-white/70 pt-4 border-t-[0.5px] border-white/30 tracking-wider italic">TICKETS VENDIDOS</h1>
        {/* Tickets por tipo (tipo | vendidos / stock) */}
        {Object.entries(entradasPorTipo).map(([tipo, { vendidos, stock }]) => (
          <div key={tipo} className="flex justify-between">
            <span className="font-bold text-gray-300 text-md">{tipo}</span>
            <span className="font-bold text-[#4da6ff] text-md">{vendidos} / {stock}</span>
          </div>
        ))}

        <div className="flex justify-between">
          <span className="font-bold text-[#7a86b6] text-md">Total</span>
          <span className="font-bold text-[#7a86b6] text-md">{totalVendidos}</span>
        </div>
      </div>
    </div>
  );
}
