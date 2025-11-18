import { HomeEventCard } from "./HomeEventCard";

export function HomeEventList({ eventos = [] }) {
  return (
    <div className="relative flex flex-col items-center justify-center pt-5 pb-10 z-10">

      <h2 className="animate-subtitle text-2xl md:text-3xl px-4 font-semibold tracking-wider text-white mb-5 text-center italic">
        NUESTROS PRÓXIMOS EVENTOS
      </h2>

      <p className="text-sm md:text-2md px-8 animate-subtitle text-center max-w-2xl mx-auto mb-10 text-white/70 tracking-wider">
        Descubrí de manera fácil y rápida todos los eventos que se vienen con nuestra{" "}
        <span className=" animate-title font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#03055F] to-[#00B4D8]">
          TICKETERA QR
        </span>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-15 mx-10">
        <HomeEventCard eventos={eventos} />
      </div>

    </div>
  );
}