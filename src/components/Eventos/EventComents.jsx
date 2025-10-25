import { useEffect, useState } from "react";
import { getComentariosByEvento } from "../../api/comentarios";

export default function ReseñasEvento({ evento }) {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComentarios = async () => {
      if (!evento?.id) return;
      const res = await getComentariosByEvento(evento.id);
      if (res.error) setError(res.error);
      else setComentarios(res);
      setLoading(false);
    };
    fetchComentarios();
  }, [evento.id]);

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
                  {c.cliente?.user?.nombre || "Usuario anónimo"}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
