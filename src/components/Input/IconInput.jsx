import React from "react";

export default function IconInput({ 
  icon, 
  active = false, 
  onClick, 
  className = "" 
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-2 rounded-full cursor-pointer transition-all duration-200
        shadow-md hover:shadow-lg 
        flex items-center justify-center
        ${active 
          ? "bg-[#03045E] text-white shadow-blue-900/40" 
          : "bg-gray-800 text-gray-300 hover:bg-gray-700"}
        ${className}
      `}
    >
      {icon && React.cloneElement(icon, { className: "w-5 h-5" })}
    </button>
  );
}
