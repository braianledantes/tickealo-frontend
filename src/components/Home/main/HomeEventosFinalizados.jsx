import { useEffect, useRef, memo } from "react";
import { formatearFechaLarga } from "../../../utils/formatear";

/* -------------------------------------------------------
   CARD ANIMADA
-------------------------------------------------------- */
function AnimatedCard({ evento}) {
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

  const imageUrl = evento.portadaUrl || evento.bannerUrl;
  const ahora = evento.finAt ? new Date() <= new Date(evento.finAt) : false;
  return (
    <div
      ref={cardRef}
      className="opacity-0 relative cursor-pointer overflow-hidden rounded-tr-5xl shadow-lg bg-black/20 backdrop-blur-sm w-[350px] h-[450px] transition-transform duration-700 ease-in-out hover:-translate-y-3 card-glow flex-shrink-0"
    >
      {ahora && (
        <div className="absolute z-3 top-4 -right-14 bg-gray-200 text-black font-bold tracking-wider py-2 px-16 text-sm transform rotate-45 shadow-lg pointer-events-none">
          AHORA
        </div>
      )}

      <img
        src={imageUrl}
        alt={evento.nombre}
        className="w-full h-full object-cover rounded-tr-4xl absolute inset-0"
        fetchPriority="high"
        decoding="async"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

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

/* -------------------------------------------------------
   LISTA DE TARJETAS
-------------------------------------------------------- */
const HomeEventCard = memo(function HomeEventCardComponent({ eventos = [] }) {
  return (
    <>
      {eventos.map((evento) => {
        return (
          <AnimatedCard
            key={evento.id}
            evento={evento}
          />
        );
      })}
    </>
  );
});

/* -------------------------------------------------------
   SECCIÓN PRINCIPAL
-------------------------------------------------------- */
function HomeEventosFinalizados({ eventos = [] }) {
  if (!eventos) return null; 

  const limitedEventos = eventos.slice(0, 6);
  const count = limitedEventos.length;

  const isCarousel = count > 3;

  return (
    <div className="relative flex flex-col items-center justify-center pt-5 pb-10 z-10">
      <h2 className="animate-subtitle text-2xl md:text-3xl px-4 font-semibold tracking-wider text-white mb-5 text-center italic">
        EVENTOS EN CURSO Y FINALIZADOS
      </h2>

      <p className="text-sm md:text-2md px-8 animate-subtitle text-center max-w-2xl mx-auto mb-10 text-white/70 tracking-wider">
        Estos eventos se sumaron a{" "}
        <span className="animate-title font-bold text-white">TICKEALO</span>{" "}
        y acá te mostramos cuándo se vivieron.
      </p>

      {/*CARRUSEL SEGÚN CANTIDAD */}
      <div
        className={
          isCarousel
            ? "flex gap-10 overflow-x-auto px-10 py-4 scrollbar-hide"
            : `grid gap-15 mx-10 ${
                count === 1
                  ? "grid-cols-1 place-items-center"
                  : count === 2
                  ? "grid-cols-2 place-items-center"
                  : "grid-cols-3"
              }`
        }
      >
        <HomeEventCard eventos={limitedEventos} />
      </div>
    </div>
  );
}

export const HomeEventList = memo(HomeEventosFinalizados);
export default HomeEventosFinalizados;
