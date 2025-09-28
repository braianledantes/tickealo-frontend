export default function EventLoading({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden border border-white/10 bg-white/5 flex flex-col shadow-md rounded-b-xl animate-pulse"
          style={{ transition: "transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease" }}
        >
          {/* Imagen portada */}
          <div className="w-full aspect-[20/13] bg-gray-700 relative rounded-t-xl"></div>

          {/* Estado simulado arriba a la derecha */}
          <span className="absolute -top-2 -right-2 m-2 px-3 py-1 rounded-bl-xl bg-gray-500 text-white text-xs tracking-wide font-medium shadow-md">
            &nbsp;
          </span>

          {/* Info */}
          <div className="p-4 flex flex-col gap-2">
            <div className="h-5 bg-gray-700 rounded w-3/4"></div> {/* Título */}
            <div className="h-3 bg-gray-700 rounded w-1/2"></div> {/* Fecha */}
            <div className="h-3 bg-gray-700 rounded w-1/3"></div> {/* Ubicación */}
          </div>
        </div>
      ))}
    </div>
  );
}

