export default function ComprasLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <h3 className="h-7 w-1/3 bg-white/20 rounded-xl "></h3>

      <div className="w-full pt-2">
        <ul>
          <li className="mb-3 p-5 rounded-full grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 bg-white/10 place-items-center">
            <span className="h-4 w-20 bg-white/20 rounded"></span>
            <span className="hidden lg:block md:block h-4 w-20 bg-white/20 rounded"></span>
            <span className="hidden lg:block h-4 w-16 bg-white/20 rounded"></span>
            <span className="hidden lg:block h-4 w-12 bg-white/20 rounded"></span>
            <span className="hidden lg:block h-4 w-16 bg-white/20 rounded"></span>
            <span className="h-4 w-12 bg-white/20 rounded"></span>
          </li>

          {Array.from({ length: 3 }).map((_, i) => (
            <li
              key={i}
              className="mb-3 p-5 rounded-full grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 bg-white/5 gap-x-2 place-items-center"
            >
              <span className="h-4 w-12 bg-white/20 rounded"></span>
              <span className="hidden lg:block md:block h-4 w-20 bg-white/20 rounded"></span>
              <span className="hidden lg:block h-4 w-16 bg-white/20 rounded"></span>
              <span className="hidden lg:block h-4 w-12 bg-white/20 rounded"></span>
              <span className="hidden lg:block h-4 w-16 bg-white/20 rounded"></span>
              <span className="h-4 w-12 rounded bg-blue-400/30"></span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 py-6 border-t border-white/30">
        <div className="h-6 w-20 bg-white/10 rounded col-start-1"></div>
        <div className="h-6 w-16 bg-white/10 rounded col-start-2 justify-self-center"></div>
        <div className="h-6 w-20 bg-white/10 rounded col-start-3 justify-self-end"></div>
      </div>
    </div>
  );
}
