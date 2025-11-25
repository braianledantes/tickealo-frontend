import { MapPin } from "lucide-react";

export default function EventCard({ evento, onClick }) {
  let estado;

  if (evento.cancelado) {
    estado = "CANCELADO";
  } else if (new Date(evento.finAt) < new Date()) {
    estado = "FINALIZADO";
  } else if (evento.stockEntradas <= 0) {
    estado = "AGOTADO";
  } else {
    estado = "ACTIVO";
  }

  const handleEventClick = () => {
    onClick(evento);
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
      onClick={handleEventClick}
      className="overflow-hidden border border-white/10 bg-gradient-to-t from-[#0E1531] to-[#11215D] hover:bg-white/10
                  transition transform hover:scale-101 cursor-pointer flex flex-col
                  shadow-md hover:shadow-xl rounded-xl"
      style={{
        transition:
          "transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Portada: siempre mantiene ratio 4:5 */}
      <div className="w-full aspect-[4/5]  bg-gray-800 relative overflow-hidden">
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
        {/* Estado arriba a la derecha */}
        <span
          className={`absolute text-center top-2 -right-18 m-2 px-16 py-2 rounded-br-xl text-sm tracking-wide font-bold uppercase shadow-md transform rotate-45 pointer-events-none ${
            evento.cancelado
              ? "bg-gray-900 text-white"
              : estado === "FINALIZADO"
              ? "bg-[#4B5563] text-white"
              : estado === "AGOTADO"
              ? "bg-red-500 text-white"
              : "bg-[#00A86B] text-white"
          }`}
        >
          {estado}
        </span>
      </div>
      {/* Info: ocupa la otra mitad */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg uppercase font-bold leading-tight text-[#CAF0F8] mb-2">
          {evento.nombre}
        </h3>
        {/* Fechas */}
        <p className="text-sm text-[#90E0EF] mb-1">
          {formatFecha(evento.inicioAt)} - {formatFecha(evento.finAt)}
        </p>
        {/* Lugar */}
        {evento.lugar && (
          <div className="text-sm text-white/90 flex items-center gap-1">
            <MapPin className="w-5 h-5 mr-1" />
            <span>{evento.lugar.direccion}</span>
          </div>
        )}
      </div>
    </div>
  );
}
