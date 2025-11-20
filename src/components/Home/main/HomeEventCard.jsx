import { useEffect, useRef, memo } from "react";
import { formatearFechaLarga } from "../../../utils/formatear";

function AnimatedCard({ evento, sinCupos, porFinalizar }) {
  const cardRef = useRef(null);
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-fadeUp");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  // Extrae la url de la imagen
  const imageUrl = evento.portadaUrl || evento.bannerUrl;
  return (
    <div
      ref={cardRef}
      className="opacity-0 relative cursor-pointer overflow-hidden rounded-tr-5xl shadow-lg bg-black/20 backdrop-blur-sm w-[350px] h-[450px] transition-transform duration-700 ease-in-out hover:-translate-y-3 card-glow"
    >
      {sinCupos && (
        <div className="absolute z-3 top-5 -right-16 bg-red-600 text-white font-bold tracking-wider py-2 px-16 text-sm transform rotate-45 shadow-lg pointer-events-none">
          AGOTADAS
        </div>
      )}

      {!sinCupos && porFinalizar && (
        <div
          className="
            absolute z-30 top-8 -right-16
            bg-blue-900 text-white font-bold tracking-wider
            py-2 px-16 text-sm
            transform rotate-45
            shadow-lg pointer-events-none
          "
        >
          POR EMPEZAR
        </div>
      )}

      <img
        src={imageUrl}
        alt={evento.nombre}
        className="w-full h-full object-cover rounded-tr-4xl absolute inset-0"
        fetchPriority="high"
        decoding="async"
        width="446"
        height="563"
        style={{ zIndex: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90  via-black/40 to-transparent" style={{ zIndex: 2 }} />
      <div className="absolute bottom-0 left-0 right-0 p-4" style={{ zIndex: 3 }}>
        <h3 className="text-white font-semibold text-lg drop-shadow-md italic">{evento.nombre}</h3>
        <p className="text-white tracking-wider text-md mt-1">{formatearFechaLarga(evento.inicioAt)}</p>
      </div>
    </div>
  );
}

function HomeEventCardComponent({ eventos = [] }) {
  return (
    <>
      {eventos.map(evento => {
        const sinCupos = Number(evento.stockEntradas) === 0;
        const porFinalizar = (() => {
          const ahora = new Date();
          const fin = new Date(evento.inicioAt);

          const diferenciaMs = fin - ahora;
          const unDiaMs = 24 * 60 * 60 * 1000;

          return diferenciaMs > 0 && diferenciaMs < unDiaMs;
        })();
        return <AnimatedCard key={evento.id} evento={evento} sinCupos={sinCupos} porFinalizar={porFinalizar}/>;
      })}
    </>
  );
}

export const HomeEventCard = memo(HomeEventCardComponent);
