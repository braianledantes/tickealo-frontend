import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { MapPin } from "lucide-react";

export default function EventCard({ evento, onSelect }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PATHS.UNEVENTO.replace(':id', evento.id));
  };

  const formatFecha = (fechaIso) => {
  if (!fechaIso) return "Fecha no definida";
  try {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "Fecha inválida";
  }
};

return (
  <div
    onClick={handleClick}
    className="overflow-hidden border border-white/10 bg-gradient-to-t from-[#0E1531] to-[#11215D] hover:bg-white/10 
               transition transform scale-95 hover:scale-100 cursor-pointer flex flex-col 
               shadow-md hover:shadow-xl rounded-b-xl"
  >
    {/* Imagen portada */}
    <div className="w-full h-60 aspect-[20/13] bg-gray-800 relative">
      {evento.portadaUrl ? (
        <img
          src={evento.portadaUrl}
          alt={evento.nombre}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          Sin portada
        </div>
      )}

      {/* Estado */}
      <span
        className={`absolute -top-2 -right-2 m-2 px-3 py-1 rounded-bl-xl text-xs tracking-wide font-medium shadow-md ${
          evento.cancelado
            ? "bg-amber-500/80 text-white"
            : "bg-[#00DF81]  text-white"
        }`}
      >
        {evento.cancelado ? "CANCELADO" : "ACTIVO"}
      </span>
    </div>

    {/* Info */}
    <div className="p-4">
      <h3 className="text-lg font-semibold text-white mb-2">{evento.nombre}</h3>

      {/* Mostrar inicio y fin */}
      <p className="text-sm mb-1" style={{ color: "#A5A6AD" }}>
        {formatFecha(evento.inicioAt)} - {formatFecha(evento.finAt)}
      </p>

      <div className="flex items-center text-sm font-medium" style={{ color: "#20347F" }}>
        <MapPin size={16} className="mr-1" />
        {evento.lugar?.direccion || "Ubicación no disponible"}
      </div>
    </div>
  </div>
);
}