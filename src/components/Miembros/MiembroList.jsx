import { Trash2 } from "lucide-react";
import Avatar from "../Avatar";

export default function MiembrosList({ miembros = [], text = "",onEliminar, loading = false }) {

  return (
    <div className="space-y-2">
      <h3 className="text-[#A5A6AD] font-bold mb-2 tracking-wide">{text}</h3>

      {/* Mensaje cuando no hay miembros */}
      {miembros.length === 0 && (
        <p className="text-center text-gray-400 italic">No hay validadores.</p>
      )}
      
      <ul>
        {miembros.map((m, i) => {
          const miembro = m.user || m.cliente || {};
          const imagen = miembro.imagenUrl || miembro.imagenPerfilUrl;
          const nombre = miembro.nombre || miembro.username || "Usuario";
          const email = miembro.email || (miembro.user && miembro.user.email) || "";

          return (
            <li
              key={i}
              className="flex justify-between items-center p-3 rounded-full hover:bg-white/5 transition"
            >
              <div className="flex items-center gap-3">
                <Avatar src={imagen} name={nombre} size={12} />
                <div>
                  <p className="text-white text-xl font-semibold">{nombre}</p>
                  <p className="hidden lg:block text-gray-400 text-sm">{email}</p>
                </div>
              </div>

              {onEliminar && (
                <button
                  onClick={() => onEliminar(email)}
                  className="text-red-400 hover:text-red-600 p-4"
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
