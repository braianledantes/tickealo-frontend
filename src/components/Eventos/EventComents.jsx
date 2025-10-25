import { useEffect } from "react";
import { useComentarios } from "../../hooks/useComentarios";
import { Pin, PinOff, Trash, Star } from "lucide-react";
import IconButton from "../Button/IconButton";
import { recentTime } from "../../utils/formatearFecha";

export default function ReseñasEvento({ evento }) {
  const {
    comentarios,
    getComentariosByEvento,
    loading,
    error,
    fijarComentario,
    desfijarComentario,
    eliminarComentario,
  } = useComentarios();

  useEffect(() => {
    if (!evento?.id) return;
    getComentariosByEvento(evento.id);
  }, [evento?.id]);

  const toggleFijado = async (comentario) => {
    try {
      if (comentario.fijado) {
        await desfijarComentario(comentario.id);
      } else {
        await fijarComentario(comentario.id);
      }
      await getComentariosByEvento(evento.id);
    } catch (err) {
      console.error("Error al cambiar estado de fijado:", err);
    }
  };

  const handleEliminar = async (comentario) => {
    try {
      await eliminarComentario(comentario.id);
      await getComentariosByEvento(evento.id);
    } catch (err) {
      console.error("Error al eliminar comentario:", err);
    }
  };

  return (
    <div className="text-gray-300 py-10">
      <h3 className="text-2xl font-bold mb-6 text-white">Reseñas del evento</h3>

      {loading ? (
        <p className="text-gray-400">Cargando comentarios...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : comentarios.length === 0 ? (
        <p className="text-gray-400">Aún no hay comentarios.</p>
      ) : (
        <div className="space-y-4">
          {comentarios.map((c) => (
            <div
              key={c.id}
              className="bg-[#05081b]/60 border border-white/10 p-4 rounded-3xl"
            >
              {/* Fijado */}
              {c.fijado && (
                <div className="flex items-center mb-2">
                  <Pin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 ml-2 text-sm">
                    Fijado por ti
                  </span>
                </div>
              )}

              {/* Header usuario */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {c.cliente.imagenPerfilUrl ? (
                    <img
                      src={c.cliente.imagenPerfilUrl}
                      alt={`${c.cliente.nombre} ${c.cliente.apellido}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold">
                      {c.cliente.nombre?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}

                  <div className="ml-3">
                    <p className="text-white font-semibold text-md">
                      {c.cliente.nombre} {c.cliente.apellido}
                    </p>
                    <p className="text-gray-400 text-sm">
                      @{c.cliente.user.username}
                    </p>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex space-x-2">
                  <IconButton
                    icon={c.fijado ? <PinOff /> : <Pin />}
                    onClick={() => toggleFijado(c)}
                    bg="bg-none"
                  />
                  <IconButton
                    icon={<Trash />}
                    onClick={() => handleEliminar(c)}
                    bg="bg-none"
                  />
                </div>
              </div>

              {/* Comentario */}
              {c.calificacion > 0 && (
                <div className="flex mt-3">
                  {Array.from({ length: c.calificacion }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-100 mr-1" />
                  ))}
                </div>
              )}
              <p className="text-gray-300 text-sm mt-3">{c.comentario}</p>
              <p className="text-gray-500 text-xs mt-1">
                {recentTime(c.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
