import { memo } from "react";
import { HomeEventCard } from "./HomeEventCard";

export default function HomeEventosFinalizados({ eventos = [] }) {
  const ultimosEventos = [...eventos]
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 3);

  const hasEventos = ultimosEventos.length > 0;

  return (
    <div className="relative flex flex-col items-center justify-center pt-5 pb-10 z-10 min-h-[700px]">
      <h2 className="animate-subtitle text-2xl md:text-3xl px-4 font-semibold tracking-wider text-white mb-5 text-center italic">
        EVENTOS EN CURSO Y FINALIZADOS
      </h2>

      <p className="text-sm md:text-2md px-8 animate-subtitle text-center max-w-2xl mx-auto mb-10 text-white/70 tracking-wider">
        Estos eventos se sumaron a{" "}
        <span className="animate-title font-bold text-white">TICKEALO</span>{" "}
        y acá te mostramos cuándo se vivieron.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-15 mx-10 min-h-[400px]">
        {hasEventos ? (
          <HomeEventCard eventos={ultimosEventos} />
        ) : (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="relative cursor-pointer overflow-hidden rounded-tr-5xl shadow-lg bg-[#10142b] backdrop-blur-sm w-[350px] h-[450px] mx-auto animate-pulse"
              style={{ width: 350, height: 450 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="h-6 w-3/4 bg-gray-700 rounded mb-2" />
                <div className="h-4 w-1/2 bg-gray-800 rounded" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export const HomeEventList = memo(HomeEventosFinalizados);