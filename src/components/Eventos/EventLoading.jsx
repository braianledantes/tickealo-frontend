export default function EventLoading({ count = 6, type = "card" }) {
  const renderCardLoading = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden border border-white/10 bg-white/5 flex flex-col shadow-md rounded-b-xl animate-pulse"
          style={{ transition: "transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease" }}
        >
          <div className="w-full aspect-[20/13] bg-gray-700 relative rounded-t-xl"></div>
          <span className="absolute -top-2 -right-2 m-2 px-3 py-1 rounded-bl-xl bg-gray-500 text-white text-xs tracking-wide font-medium shadow-md">
            &nbsp;
          </span>
          <div className="p-4 flex flex-col gap-2">
            <div className="h-5 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDetailLoading = () => (
    <div className="lg:col-span-7 space-y-6 animate-pulse">
      {/* Banner simulado */}
      <div className="w-full aspect-[11/4] bg-gray-700 rounded-lg"></div>

      {/* Datos básicos simulados */}
      <div className="border border-white/10 bg-[#05081b]/40 p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="h-12 bg-gray-700 rounded w-full"></div>
          <div className="h-12 bg-gray-700 rounded w-full"></div>
          <div className="h-12 bg-gray-700 rounded w-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-12 bg-gray-700 rounded w-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-10 border-b border-white/50">
          <div className="h-48 bg-gray-700 rounded w-full"></div>
          <div className="h-48 bg-gray-700 rounded w-full"></div>
          <div className="h-24 bg-gray-700 rounded w-full col-span-2"></div>
        </div>

        {/* Entradas simuladas */}
        <div className="pb-10 border-b border-white/50 space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-12 bg-gray-700 rounded w-full"></div>
              <div className="h-12 bg-gray-700 rounded w-full"></div>
              <div className="h-12 bg-gray-700 rounded w-full"></div>
            </div>
          ))}
        </div>

        {/* Cuenta bancaria simulada */}
        <div className="h-32 bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  );

  return type === "card" ? renderCardLoading() : renderDetailLoading();
}
