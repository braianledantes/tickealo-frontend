import { useEffect, useState } from "react";
import { useComentarios } from "../../hooks/useComentarios";
import { Pin } from 'lucide-react';
import IconButton from "../Button/IconButton";

export default function ReseñasEvento({ evento }) {
    const {
      getComentariosByEvento, loading, error, fijarComentario
    } = useComentarios();
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const fetchComentarios = async () => {
      if (!evento?.id) return;
      const res = await getComentariosByEvento(evento.id);
       setComentarios(res);
    };
    fetchComentarios();
  }, [evento.id]);

  console.log(comentarios)

  return (
    <div className="text-gray-300 py-10">
      <h3 className="text-2xl font-bold mb-4 text-white">Reseñas del evento</h3>

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
              className="bg-[#05081b]/60 border border-white/10 p-4 rounded-lg"
            >
              <div className="flex justify-between items-center mb-1">
                <p className="text-white font-semibold">
                  
                  {c.cliente.nombre}{" "}{c.cliente.apellido}
                </p>
                {c.calificacion > 0 && (
                  <span className="text-yellow-400 text-sm">
                    {"⭐".repeat(c.calificacion)}
                  </span>
                )}
              </div>
              <p className="text-gray-300 mb-1">“{c.comentario}”</p>
              <p className="text-xs text-gray-500">
                {new Date(c.createdAt).toLocaleDateString("es-AR")}
              </p>
                <IconButton
                  icon={<Pin />}
                  onClick={async () => {
                    try {
                      await fijarComentario(c.id);
                    } catch (err) {
                      console.error("Error al fijar comentario:", err);
                    }
                  }}
                />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
