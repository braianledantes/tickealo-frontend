export default function Avatar({ src, name = "Usuario", size = 10, onClick }) {
  const firtsLetter = name ? name.charAt(0).toUpperCase() : "?";
  
  return src ? (
    <img
      src={src}
      alt={name}
      className={`w-${size} h-${size} rounded-full object-cover ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    />
  ) : (
    <div className={`w-${size} h-${size} rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold`}>
      {firtsLetter}
    </div>
  )
}