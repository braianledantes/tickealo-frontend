import { formatearFechaCorta, formatCurrency, formatNumber } from "../../utils/formatear";

export default function HistorialCompraRow({ fechaISO, antes, delta, despues, precioARS }) {
  return (
    <div className="grid grid-cols-12 items-center px-4 py-3 border-b border-white/10 hover:bg-white/5 transition">
      <div className="col-span-3 text-gray-300">{formatearFechaCorta(fechaISO)}</div>
      <div className="col-span-2 text-gray-400 line-through">
        {formatNumber(antes)}
      </div>
      <div className="col-span-2 text-emerald-400 flex items-center gap-1">
        + {formatNumber(delta)}
      </div>
      <div className="col-span-1 text-gray-400 text-center">→</div>
      <div className="col-span-2 text-white font-semibold">
        {formatNumber(despues)}
      </div>
      <div className="col-span-2 flex items-center justify-end gap-3">
        <span className="text-gray-200">{formatCurrency(precioARS)}</span>
      </div>
    </div>
  );
}