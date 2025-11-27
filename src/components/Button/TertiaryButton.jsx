export default function TertiaryButton({ type = "submit", text, onClick, bg="bg-[#FF3B30]", children, aspect="warn" }) {
  return (
    <button
      type={type}
      onClick={onClick}   
      className={`
        cursor-pointer tracking-wider font-medium py-3 px-6 rounded-full shadow-lg 
        transition-all duration-300 transform w-full flex justify-center items-center my-2
        ${aspect === "warn" 
          ? "border border-red-500 text-red-500 hover:shadow-red-900/25" 
          : `${bg} text-white hover:shadow-blue-900/25`
        }
      `}
    >
      {children || text}
    </button>
  );
}


