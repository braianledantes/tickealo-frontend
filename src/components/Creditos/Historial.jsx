import HistorialCompraRow from "./HistorialCompraRow";
import { ShoppingCart } from "lucide-react";

export default function Historial({ historialCompras }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#05081b]/60">
      <div className="px-4 py-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white tracking-wider">
          Historial de Compras
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          Registro de todas tus compras de crédito
        </p>
      </div>

      {historialCompras.length === 0 ? (
        <div className="px-4 py-12 text-center">
          <div className="text-gray-400 mb-2">
            <ShoppingCart size={48} className="mx-auto opacity-30" />
          </div>
          <p className="text-gray-400">No tienes compras de crédito aún</p>
          <p className="text-sm text-gray-500 mt-1">
            Cuando realices una compra, aparecerá aquí el historial
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-12 px-4 py-3 text-xs uppercase tracking-widest text-gray-400 border-b border-white/10">
            <div className="col-span-3">Fecha</div>
            <div className="col-span-2">Antes</div>
            <div className="col-span-2">Cambio</div>
            <div className="col-span-1 text-center"> </div>
            <div className="col-span-2">Después</div>
            <div className="col-span-2 text-right">Precio</div>
          </div>

          {historialCompras.map((compra) => (
            <HistorialCompraRow
              key={compra.id}
              fechaISO={compra.createdAt}
              antes={compra.creditosPrevios}
              delta={compra.creditos}
              despues={compra.creditosPosterior}
              precioARS={compra.precio}
            />
          ))}
        </>
      )}
    </div>
  );
}
