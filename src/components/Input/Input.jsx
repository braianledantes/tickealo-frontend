import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // íconos para mostrar/ocultar

export default function Input({ icon, placeholder, type = "text", value, onChange, name }) {
  const [showPassword, setShowPassword] = useState(false);

  // Determinar el tipo real del input
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex items-center px-4 py-3 text-sm rounded-full bg-[#080C22] text-white placeholder-gray-300 backdrop-blur-sm focus-within:ring-2 focus-within:ring-blue-800 w-full relative">
      
      {icon && (
        <span className="flex items-center justify-center w-9 h-8 mr-2 rounded-full bg-[#FDFDFD]/20">
          {React.cloneElement(icon, { className: "w-4 h-4" })}
        </span>
      )}

      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="bg-transparent outline-none text-white placeholder-gray-300 w-full pr-10"
      />

      {/* Botón para mostrar/ocultar contraseña */}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-6 flex items-center justify-center text-gray-400"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
}
