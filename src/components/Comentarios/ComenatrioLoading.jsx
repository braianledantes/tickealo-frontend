export default function ComentarioLoading() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-[#05081b]/60 border border-white/10 p-4 rounded-3xl animate-pulse"
        >
          {/* Fijado (placeholder) */}
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
            <div className="ml-2 h-3 w-20 bg-gray-700 rounded"></div>
          </div>

          {/* Header usuario */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-600"></div>

              <div className="ml-3 space-y-2">
                <div className="h-4 w-32 bg-gray-600 rounded"></div>
                <div className="h-3 w-24 bg-gray-700 rounded"></div>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            </div>
          </div>

          {/* Comentario y fecha */}
          <div className="mt-3 space-y-2">
            <div className="h-4 w-full bg-gray-700 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
            <div className="h-3 w-24 bg-gray-600 rounded mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
