export default function SecondaryButton({
  type = "submit",
  text,
  onClick,
  bgColor = "#03055F",
  children,
  disabled = false
}) {
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation(); 
      return;
    }
    if (onClick) onClick(e);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className="relative w-full rounded-full p-[3px] flex justify-center items-center overflow-hidden transition-all duration-300"
      style={{
        background: "linear-gradient(to right, #03055F, #00B4D8, #90E0EF, #CAF0F8)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <span
        className="w-full h-full flex justify-center items-center rounded-full"
        style={{
          backgroundColor: "rgba(5, 8, 27, 0.93)",
          padding: "0.5rem 1.5rem",
          fontWeight: 600,
          color: "#fff",
        }}
      >
        <div
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          className="flex items-center gap-2 text-sm"
        >
          {children || text}
        </div>
      </span>
    </button>
  );
}
