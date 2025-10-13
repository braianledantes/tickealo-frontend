import { useState } from "react";
import { ChevronLeft, ChevronRight, X} from "lucide-react";
import { formatearFecha } from "../../utils/formatearFecha";
import ComprasDetail from "../Compras/ComprasDetail";
import {EstadoCompra} from "../FeedBack/Estados";

export default function ComprasList({ compras = [], text = "", loading = false, pagination, onNextPage, onPrevPage, onActualizar }) {
  const [selectedCompraId, setSelectedCompraId] = useState(null);

  if (!compras.length) return null;
  
  // Colores según estado
  const estadoColor = {
    PENDIENTE: "bg-gray-500/30 border-1 border-gray-500 text-white px-2 py-1 rounded-lg",
    ACEPTADA: "bg-green-500 text-white px-2 py-1 rounded-full",
    RECHAZADA: "bg-red-500 text-white px-2 py-1 rounded-lg",
  };

  return (
    <div className="space-y-2">
      <h3 className="text-[#A5A6AD] font-bold mb-2 tracking-wide">{text}</h3>
      <div className="w-full">
        <ul>
          <li className="p-3 tracking-wider font-semibold mb-3 rounded-full grid place-items-center lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 text-white bg-white/5">
            <span>Id Compra</span>
            <span className="hidden lg:block md:block">Cliente</span>
            <span className="hidden lg:block ">Fecha</span>
            <span className="hidden lg:block ">Monto</span>
            <span className="hidden lg:block">Estado</span>
            <span>Acciones</span>
          </li>
          {compras.map((c, i) => {
            const compra = c.user || c.cliente || {};
            const nombre = compra.nombre || compra.username || "Usuario";

            return (
              <li
                key={i}
                className="p-3 items-center place-items-center rounded-full hover:bg-white/5 transition grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 text-white"
              >
                <span className="font-semibold tracking-wide text-gray-500">#{c.id}</span>
                <span className="hidden lg:block md:block">{nombre} {compra.apellido}</span>
                <span className="hidden lg:block text-gray-500">{formatearFecha(c.createdAt)}</span>
                <span className="hidden lg:block">{c.monto}</span>
                <EstadoCompra estadoCompra={c.estado} className="hidden lg:flex items-center"/>
                <div>
                  <span
                    onClick={() => setSelectedCompraId(c.id)}
                    className="cursor-pointer text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Ver más
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Controles de paginación */}
      {pagination && (
        <div className="grid grid-cols-3 gap-4 mt-6 py-6 border-t border-white/30 text-gray-300">
          
          {/* Botón Anterior*/}
          {pagination.hasPreviousPage ? (
            <button
              onClick={onPrevPage}
              className="flex justify-start items-center rounded cursor-pointer hover:text-white"
            >
              <ChevronLeft className="mr-1" /> Anterior
            </button>
          ) : <div></div>} 

          <span className="flex justify-center items-center">Página {pagination.page}</span>

          {/* Botón Siguiente */}
          {pagination.hasNextPage ? (
            <button
              onClick={onNextPage}
              className="flex justify-end items-center rounded cursor-pointer hover:text-white"
            >
              Siguiente <ChevronRight className="ml-1" />
            </button>
          ) : <div></div>} 
          
        </div>
      )}

      {/* DETALLE COMPRA */}
      {selectedCompraId && ( <ComprasDetail compraId={selectedCompraId} onClose={() => setSelectedCompraId(null)} onActualizar={onActualizar} /> )}

    </div>
  );
}