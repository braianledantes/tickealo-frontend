export default function Avatar({ src, name = "Usuario", size = 10, onClick }) {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "?";

  const baseClasses = `
    w-${size} h-${size} rounded-full 
    focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 
    focus:ring-offset-[#05081b]
  `;

  return src ? (
    <img
      src={src}
      alt={name}
      tabIndex={0}
      onClick={onClick}
      className={`${baseClasses} object-cover ${onClick ? "cursor-pointer" : ""}`}
    />
  ) : (
    <div
      tabIndex={0}
      onClick={onClick}
      className={`${baseClasses} bg-purple-600 flex items-center justify-center text-white font-semibold ${onClick ? "cursor-pointer" : ""}`}
    >
      {firstLetter}
    </div>
  );
}
