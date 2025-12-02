import { memo } from "react";
import { HomeEventCard } from "./HomeEventCard";

export default function HomeEventosProximos({ eventos = [] }) {
  const hasEventos = eventos && eventos.length > 0;
  return (
    <div className="relative flex flex-col items-center justify-center pt-5 pb-10 z-10 min-h-[700px]">
      <h2 className="animate-subtitle text-2xl md:text-3xl px-4 font-semibold tracking-wider text-white mb-5 text-center italic">
        NUESTROS PRÓXIMOS EVENTOS
      </h2>
      <p className="text-sm md:text-md px-8 animate-subtitle text-center max-w-2xl mx-auto mb-10 text-white/70 tracking-wider">
        Descubrí de manera fácil y rápida todos los eventos que se vienen con nuestra{" "}
        <span className=" animate-title font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#03055F] to-[#00B4D8]">
          TICKETERA QR
        </span>.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-15 mx-10 min-h-[400px]">
        {hasEventos ? (
          <HomeEventCard eventos={eventos} />
        ) : (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="relative cursor-pointer overflow-hidden rounded-tr-5xl shadow-lg bg-[#10142b] backdrop-blur-sm w-[350px] h-[450px] mx-auto animate-pulse" style={{ width: 350, height: 450 }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="h-6 w-3/4 bg-gray-700 rounded mb-2" style={{ minWidth: '75%', minHeight: 24 }} />
                <div className="h-4 w-1/2 bg-gray-800 rounded" style={{ minWidth: '50%', minHeight: 16 }} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export const HomeEventList = memo(HomeEventosProximos);