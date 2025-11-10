import { useEffect, useRef } from "react";
import { formatearFechaLarga } from "../../../utils/formatearFecha";

export function HomeEventCard({ eventos = [] }) {
  return (
    <>
      {eventos.map(evento => {
        const sinCupos = evento.stockEntradas === 0;
        return <AnimatedCard key={evento.id} evento={evento} sinCupos={sinCupos} />;
      })}
    </>
  );
}

function AnimatedCard({ evento, sinCupos }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-fadeUp");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
  }, []);

  return (
    <div
      ref={cardRef}
      className="
        opacity-0
        relative
        cursor-pointer overflow-hidden rounded-tr-5xl shadow-lg
        bg-black/20 backdrop-blur-sm
        w-[350px] h-[450px]

        transition-transform duration-700 ease-in-out
        hover:-translate-y-3
        card-glow
      "
    >
      {sinCupos && (
        <div
          className="
            absolute top-5 -right-16
            bg-red-600 text-white font-bold tracking-wider
            py-2 px-16 text-sm
            transform rotate-45
            shadow-lg
            pointer-events-none
          "
        >
          AGOTADAS
        </div>
      )}

      {/* Imagen */}
      <div
        className="w-full h-full bg-cover bg-center rounded-tr-4xl"
        style={{
          backgroundImage: `url('${evento.portadaUrl || evento.bannerUrl}')`,
        }}
      />

      {/* Degradado */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Texto */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-semibold text-lg drop-shadow-md italic">
          {evento.nombre}
        </h3>

        <p className="text-white tracking-wider text-md mt-1">
          {formatearFechaLarga(evento.inicioAt)}
        </p>
      </div>
    </div>
  );
}
