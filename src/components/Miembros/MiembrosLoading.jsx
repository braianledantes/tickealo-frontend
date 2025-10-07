export default function MiembrosLoading() {
  return (
    <div className="space-y-4 animate-pulse">

      <h3 className="h-6 w-1/3 bg-white/20 rounded-xl"></h3>

      <ul className="space-y-3 pt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <li
            key={i}
            className="flex justify-between items-center p-3 rounded-full bg-white/5"
          >
            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-full bg-white/20"></div>
              

              <div className="space-y-1">
                <div className="h-4 w-32 bg-white/20 rounded"></div>
                <div className="h-3 w-24 bg-white/10 rounded hidden lg:block"></div>
              </div>
            </div>

            <div className="w-6 h-6 bg-red-400/30 rounded-full mr-4"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
