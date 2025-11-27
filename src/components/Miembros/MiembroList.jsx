import Avatar from "../Avatar";
import MiembroDetails from "./MiembroDetail";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function MiembrosList({
  miembros = [],
  text = "",
  onEliminar,
  loading = false,
}) {
  const [miembroSeleccionado, setMiembroSeleccionado] = useState(null);

  return (
    <div className="space-y-2">
      <h3 className="text-[#cfe3ff] font-bold mb-2 tracking-wide">{text}</h3>

      {/* Mensaje cuando no hay miembros */}
      {miembros.length === 0 && (
        <p className="text-center text-gray-400 italic">No hay validadores.</p>
      )}

      <ul>
        {miembros.map((m, i) => {
          const miembro = m.user || m.cliente || {};
          const imagen = miembro.imagenUrl || miembro.imagenPerfilUrl;
          const nombre = miembro.nombre || miembro.username || "Usuario";
          const apellido = miembro.apellido || "";
          const email =
            miembro.email || (miembro.user && miembro.user.email) || "";

          return (
            <li
              key={i}
              className="flex justify-between items-center p-3 rounded-full hover:bg-white/5 transition"
            >
              <div className="flex items-center gap-3">
                <Avatar src={imagen} name={nombre} size={12} />
                <div>
                  <p className="text-white text-xl font-semibold">{nombre}{""}{apellido}</p>
                  <p className="hidden lg:block text-gray-400 text-sm">
                    {email}
                  </p>
                </div>
              </div>
              <button
                aria-label={`Ver detalle sobre ${miembro.nombre} ${miembro.apellido}`}
                title={`Ver detalle sobre ${miembro.nombre} ${miembro.apellido}`}
                onClick={() => setMiembroSeleccionado(miembro)}
                className="text-white hover:text-blue-800 flex items-center gap-2 rounded-full"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </li>
          );
        })}
      </ul>
      {miembroSeleccionado && (
        <MiembroDetails
          miembro={miembroSeleccionado}
          loading={loading}
          onEliminar={onEliminar}
          onClose={() => {
            setMiembroSeleccionado(null);
          }}
        />
      )}
    </div>
  );
}
