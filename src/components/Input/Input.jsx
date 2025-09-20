import React from "react";

export default function Input({ icon, placeholder, type = "text", value, onChange, name }) {
  return (
    <div className="flex items-center px-4 py-3 rounded-full bg-[#080C22] text-white placeholder-gray-300 backdrop-blur-sm focus-within:ring-2 focus-within:ring-blue-800 w-full">
      
      {icon && (
        <span className="flex items-center justify-center w-10 h-10 mr-2 rounded-full bg-[#FDFDFD]/20">
          {React.cloneElement(icon, { className: "w-4 h-4" })}
        </span>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="bg-transparent outline-none text-white placeholder-gray-300 w-full"
      />
    </div>
  );
}