export default function TertiaryButton({ type = "submit", text, onClick, bg="bg-[#FF3B30]", children }) {
  return (
    <button
      type={type}
      onClick={onClick}   
      className={`text-white cursor-pointer tracking-wider font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-blue-900/25 transition-all duration-300 transform hover:scale-105 w-full flex justify-center items-center 
                ${bg}`}
    >
      {children || text}
    </button>
  );
}


