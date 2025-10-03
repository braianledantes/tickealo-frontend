export default function SecondaryButton({ type = "submit", text, onClick, bgColor = "#03055F" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="relative w-full rounded-full p-[3px] flex justify-center items-center overflow-hidden cursor-pointer hover:shadow-blue-900/25 transition-all duration-300 transform hover:scale-105"
      style={{
        background: "linear-gradient(to right, #03055F, #00B4D8, #90E0EF, #CAF0F8)",
      }}
    >
      <span
        className="w-full h-full flex justify-center items-center rounded-full"
        style={{
          backgroundColor: "rgba(5, 8, 27, 0.93)", 
          padding: "0.5rem 1.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: 600,
          color: "#fff",
        }}
      >
        {text}
      </span>
    </button>
  );
}





