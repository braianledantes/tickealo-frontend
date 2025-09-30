import { Trash2 } from "lucide-react";

/**
 * Componente reutilizable para mostrar lista de miembros.
 * 
 * @param {Array} miembros - Lista de miembros [{ user, cliente }]
 * @param {Function} onEliminar - Callback para eliminar miembro (recibe email)
 * @param {Boolean} loading - Si está cargando (deshabilita botones)
 */
export default function MiembrosList({ miembros = [], onEliminar, loading = false }) {
  if (!miembros.length) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-[#A5A6AD] font-bold mb-2 tracking-wide">MIEMBROS ACTUALES</h3>
      <ul>
        {miembros.map((m, i) => {
          const miembro = m.user || m.cliente || {};
          const imagen = miembro.imagenUrl || miembro.imagenPerfilUrl;
          const nombre = miembro.nombre || miembro.username || "Usuario";
          const email = miembro.email || (miembro.user && miembro.user.email) || "";

          return (
            <li
              key={i}
              className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition"
            >
              <div className="flex items-center gap-3">
                {imagen ? (
                  <img
                    src={imagen}
                    alt={nombre}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                    {nombre?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <div>
                  <p className="text-white text-xl font-semibold">{nombre}</p>
                  <p className="text-gray-400 text-sm">{email}</p>
                </div>
              </div>

              {onEliminar && (
                <button
                  onClick={() => onEliminar(email)}
                  className="text-red-400 hover:text-red-600"
                  disabled={loading}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
