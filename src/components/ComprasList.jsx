import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ComprasList({ compras = [], text = "", loading = false, pagination, onNextPage, onPrevPage }) {
  if (!compras.length) return null;
  
  const formatearFecha = (fecha) => {
    if (!fecha) return "-";
    return new Date(fecha).toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Colores según estado
  const estadoColor = {
    PENDIENTE: "bg-gray-500/30 border-1 border-gray-500 text-white px-2 py-1 rounded-lg",
    COMPLETADA: "bg-green-500 text-white px-2 py-1 rounded-full",
    CANCELADA: "bg-red-500 text-white px-2 py-1 rounded-lg",
  };


  return (
    <div className="space-y-2">
      <h3 className="text-[#A5A6AD] font-bold mb-2 tracking-wide">{text}</h3>
      <div className="w-full">
        <ul>
          <li className="p-3 mb-3 rounded-full grid place-items-center lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 text-white bg-white/5">
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
                <span>#{c.id}</span>
                <span className="hidden lg:block md:block">{nombre} {compra.apellido}</span>
                <span className="hidden lg:block">{formatearFecha(c.createdAt)}</span>
                <span className="hidden lg:block">{c.monto}</span>
                <span className={`hidden lg:flex items-center ${estadoColor[c.estado] || ""}`}>
                  <span className={`w-2 h-2 mr-2 rounded-full ${c.estado === 'PENDIENTE' ? 'bg-gray-500' : c.estado === 'COMPLETADA' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {c.estado}
                </span>
                <div>
                  <span className="cursor-pointer text-blue-400 hover:text-blue-300">Ver más</span>
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

    </div>
  );
}