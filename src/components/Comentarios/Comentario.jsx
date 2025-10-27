import { Pin, PinOff, Trash, Star } from "lucide-react";
import IconButton from "../Button/IconButton";
import { recentTime } from "../../utils/formatearFecha";

export default function Comentario({
  comentario,
  onFijar,
  onEliminar,
}) {
  const { cliente, fijado, calificacion, comentario: texto, createdAt } =
    comentario;

  return (
    <div className="bg-[#05081b]/60 border border-white/10 p-4 rounded-3xl">
      {/* Fijado */}
      {fijado && (
        <div className="flex items-center mb-2">
          <Pin className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 ml-2 text-sm">Fijado por ti</span>
        </div>
      )}

      {/* Header usuario */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {cliente.imagenPerfilUrl ? (
            <img
              src={cliente.imagenPerfilUrl}
              alt={`${cliente.nombre} ${cliente.apellido}`}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold">
              {cliente.nombre?.[0]?.toUpperCase() || "U"}
            </div>
          )}

          <div className="ml-3">
            <p className="text-white font-semibold text-md">
              {cliente.nombre} {cliente.apellido}
            </p>
            <p className="text-gray-400 text-sm">@{cliente.user.username}</p>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex space-x-2">
          <IconButton
            icon={fijado ? <PinOff /> : <Pin />}
            onClick={() => onFijar(comentario)}
            bg="bg-none"
          />
          <IconButton
            icon={<Trash />}
            onClick={() => onEliminar(comentario)}
            bg="bg-none"
          />
        </div>
      </div>

      {/* Calificación */}
      {calificacion > 0 && (
        <div className="flex mt-3">
          {Array.from({ length: calificacion }).map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-100 mr-1" />
          ))}
        </div>
      )}

      {/* Comentario */}
      <p className="text-gray-300 text-sm mt-3">{texto}</p>
      <p className="text-gray-500 text-xs mt-1">{recentTime(createdAt)}</p>
    </div>
  );
}
