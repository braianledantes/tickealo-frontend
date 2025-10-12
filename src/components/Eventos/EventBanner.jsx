import { MapPin } from "lucide-react";

export default function EventBanner({ evento, onClick }) {
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

  const handleOnClickEvent = () => {
    onClick(evento);
  }

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
      onClick={handleOnClickEvent}
      className="overflow-hidden border border-white/10 bg-gradient-to-t from-[#0E1531] to-[#11215D] hover:bg-white/10
                 transition transform hover:scale-101 cursor-pointer flex flex-col lg:flex-row
                 shadow-md hover:shadow-xl rounded-xl"
      style={{ transition: "transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease" }}
    >
      {/* Banner: siempre mantiene ratio 11:4 */}
      <div className="w-full lg:w-1/2 aspect-[11/4] bg-gray-800 relative flex-shrink-0">
        {evento.bannerUrl ? (
          <img
            src={evento.bannerUrl}
            alt={evento.nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Sin banner
          </div>
        )}

        {/* Estado arriba a la derecha */}
        <span
          className={`absolute -top-2 -left-2 m-2 px-3 py-1 rounded-br-xl text-xs tracking-wide font-medium shadow-md ${evento.cancelado
              ? "bg-red-600 text-white"
              : estado === "FINALIZADO"
                ? "bg-gray-500 text-white"
                : estado === "AGOTADO"
                  ? "bg-yellow-500 text-white"
                  : "bg-[#00DF81] text-white"
            }`}
        >
          {estado}
        </span>
      </div>

      {/* Info: ocupa la otra mitad */}
      <div className="p-4 w-full lg:w-1/2 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-[#CAF0F8] mb-2">{evento.nombre}</h3>

        {/* Fechas */}
        <p className="text-sm mb-1" style={{ color: "#A5A6AD" }}>
          {formatFecha(evento.inicioAt)} - {formatFecha(evento.finAt)}
        </p>

        {/* Ubicación */}
        <div className="flex items-center text-sm font-medium " style={{ color: "#20347F" }}>
          <MapPin size={16} className="mr-1" />
          {evento.lugar?.direccion || "Ubicación no disponible"}
        </div>
      </div>
    </div>
  );
}


