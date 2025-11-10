import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatearFechaLarga } from "../../../utils/formatearFecha";

// ✅ Hook simple para detectar mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
}

// ✅ Loading Card mientras carga
function CarouselLoading() {
  return (
    <div
      className="
        relative w-full aspect-[11/4]
        bg-[#10142b] rounded-xl overflow-hidden
        animate-pulse
      "
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#1b2245] to-[#0c1128] opacity-60" />

      <div className="absolute bottom-10 left-8 right-8">
        <div className="h-8 w-48 bg-white/20 rounded-md mb-3" />
        <div className="h-4 w-72 bg-white/10 rounded-md" />
      </div>
    </div>
  );
}

export function HomeEventCarousel({ eventos = [] }) {
  const [index, setIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (eventos.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % eventos.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [eventos]);

  // ✅ Muestra loading mientras no hay datos
  if (eventos.length === 0) return <CarouselLoading />;

  const evento = eventos[index];

  return (
    <div className="relative w-full aspect-[11/4] overflow-hidden mb-10 group">

      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('${evento.bannerUrl || ""}')`,
        }}
      />

      {/* Degradado */}
      <div
        className="
        absolute inset-x-0 bottom-0
        h-3/5
        bg-gradient-to-t
        from-[#05081b]/95
        via-[#05081b]/70
        to-transparent
      "
      />

      {/* ✅ Texto (responsive según pantalla) */}
      <div className="absolute bottom-10 left-8 right-8 text-white">

        {/* ✅ MOBILE: solo título, más chico */}
        {isMobile ? (
          <h1 className="text-xl font-extrabold tracking-wide drop-shadow-lg italic animate-subtitle line-clamp-2">
            {evento.nombre}
          </h1>
        ) : (
          <>
            <h1 className="animate-subtitle text-3xl md:text-6xl font-bold drop-shadow-md tracking-wider italic">
              {evento.nombre}
            </h1>

            <p className="animate-subtitle my-6 text-xs text-white/80 max-w-xl font-semibold tracking-wider italic line-clamp-3">
              {evento.descripcion}
            </p>

            <span
              className="
              px-4 py-1
              border border-white/90
              rounded-full
              text-xl md:text-sm
              font-semibold
              tracking-wide
              bg-white/10 
              backdrop-blur-sm
              shadow animate-subtitle
            "
            >
              MUY PRONTO {formatearFechaLarga(evento.inicioAt)}
            </span>
          </>
        )}
      </div>

      {/* Flechas (ocultas en mobile) */}
      {!isMobile && (
        <>
          <button
            className="
            absolute left-0 top-1/2 -translate-y-1/2
            text-white px-3 py-2 rounded-full
            opacity-0 group-hover:opacity-100
            -translate-x-6 group-hover:translate-x-0
            transition-all duration-500 cursor-pointer
          "
            onClick={() =>
              setIndex((prev) => (prev - 1 + eventos.length) % eventos.length)
            }
          >
            <ChevronLeft size={50} />
          </button>

          <button
            className="
            absolute right-0 top-1/2 -translate-y-1/2
            text-white px-3 py-2 rounded-full
            opacity-0 group-hover:opacity-100
            translate-x-6 group-hover:translate-x-0
            transition-all duration-500 cursor-pointer
          "
            onClick={() => setIndex((prev) => (prev + 1) % eventos.length)}
          >
            <ChevronRight size={50} />
          </button>
        </>
      )}

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {eventos.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
