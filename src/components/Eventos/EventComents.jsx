import { useEffect } from "react";
import { useComentarios } from "../../hooks/useComentarios";
import Comentario from "../Comentarios/Comentario";
import ComentarioLoading from "../Comentarios/ComenatrioLoading";

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
    // eslint-disable-next-line
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
        <ComentarioLoading />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : comentarios.length === 0 ? (
        <p className="text-gray-400">Aún no hay comentarios.</p>
      ) : (
        <div className="space-y-4">
          {comentarios.map((c) => (
            <Comentario
              key={c.id}
              comentario={c}
              onFijar={toggleFijado}
              onEliminar={handleEliminar}
            />
          ))}
        </div>
      )}
    </div>
  );
}
