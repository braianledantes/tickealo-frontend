export default function Button({
  type = "button",
  onClick,
  text = "",
  children,
  active = false, 
}) {
  return (
    <div
      className={`
        shadow-lg hover:shadow-blue-900/25 transition-all duration-300 group
      `}
    >
      <button
        type={type}
        onClick={onClick}
        className="text-white tracking-wider font-semibold text-xs py-3 hover:bg-white/10 rounded-tl-md rounded-tr-md transform w-full flex justify-center items-center hover:cursor-pointer"
      >
        {text}
        {children}
      </button>

      <div
        className={`
          h-1 rounded-tl-full rounded-tr-full bg-gradient-to-r
          from-[#03055F] via-[#00B4D8] via-[#90E0EF] to-[#CAF0F8]
          transition-opacity duration-300
          ${active ? "opacity-100" : "opacity-0 group-hover:opacity-50"}
        `}
      ></div>
    </div>
  );
}
