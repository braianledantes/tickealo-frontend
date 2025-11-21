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
      onClick={handleOnClickEvent}
      className="overflow-hidden border border-white/10 bg-gradient-to-r from-[#0E1531] to-[#11215D] hover:bg-white/10
                 transition transform hover:scale-101 cursor-pointer flex flex-col lg:flex-row
                 shadow-md hover:shadow-xl rounded-xl"
      style={{
        transition:
          "transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Banner: siempre mantiene ratio 11:4 */}
      <div className="w-full lg:w-1/2 aspect-[11/4] bg-gray-800 flex-shrink-0">
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
      </div>

      {/* Info: ocupa la otra mitad */}
      <div className="p-4 w-full lg:w-1/2 flex flex-col justify-center relative">
        <h3 className="text-lg font-semibold text-[#CAF0F8] mb-2">
          {evento.nombre}
        </h3>

        {/* Fechas */}
        <p className="text-sm mb-1 text-white" >
          {formatFecha(evento.inicioAt)} - {formatFecha(evento.finAt)}
        </p>

        {/* Ubicación */}
        <div
          className="flex items-center text-sm font-semibold tracking-wider text-blue-800 "
        >
          <MapPin size={16} className="mr-1" />
          {evento.lugar?.direccion || "Ubicación no disponible"}
        </div>
        {/* Estado arriba a la derecha */}
        <span
          className={`absolute top-4 -right-14 px-16 py-2 rounded-br-xl text-xs tracking-wider font-bold transform rotate-45 shadow-md ${
            evento.cancelado
              ? "bg-gray-900 text-white"
              : estado === "FINALIZADO"
              ? "bg-[#4B5563] text-white"
              : estado === "AGOTADO"
              ? "bg-red-600 text-white"
              : "bg-[#00A86B] text-white"
          }`}
        >
          {estado}
        </span>
      </div>
    </div>
  );
}
