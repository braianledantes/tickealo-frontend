export default function PacksLoading() {
  return (
    <div className="flex items-center gap-4 w-full overflow-x-auto px-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="min-w-[180px] md:min-w-[270px] p-4 rounded-2xl 
                     bg-white/5 border border-white/10 flex-shrink-0 animate-pulse"
        >
          <div className="grid grid-cols-[40%_60%] gap-4 items-center">
            
            {/* Icono skeleton */}
            <div className="w-full h-20 bg-white/10 rounded-xl" />

            {/* Texto skeleton */}
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 bg-white/10 rounded-full"></div>
              <div className="h-4 w-16 bg-white/10 rounded-full"></div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
