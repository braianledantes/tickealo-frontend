import React, { useState, useRef } from "react";
import { Eye, EyeOff, Calendar } from "lucide-react"; 

export default function Input({
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
  name,
  label,
  min,
  max,
  error,
  showError,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const handleIconClick = () => {
    if (type === "datetime-local") {
      inputRef.current?.showPicker?.();
    } else if (type === "password") {
      setShowPassword((prev) => !prev);
    }
  };

  const borderClass = showError && error
    ? "border-2 border-red-500"
    : "border border-transparent focus-within:ring-2 focus-within:ring-blue-800";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mt-2 ml-3 mb-2">
          {label}
        </label>
      )}

      <div
        className={`flex items-center px-4 py-3 text-sm rounded-full bg-[#080C22] text-white shadow-inner shadow-white/10 placeholder-gray-300 backdrop-blur-sm w-full relative ${borderClass}`}
      >
        {icon && (
          <span className="flex items-center justify-center w-9 h-8 mr-2 rounded-full bg-[#FDFDFD]/20">
            {React.cloneElement(icon, { className: "w-4 h-4" })}
          </span>
        )}

        <input
          ref={inputRef}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          min={min}
          max={max}
          className="outline-none text-white w-full pr-10 selection:bg-blue-500/30 selection:text-white"
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-6 flex items-center justify-center text-gray-400"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}

        {type === "datetime-local" && (
          <button
            type="button"
            onClick={handleIconClick}
            className="absolute right-6 flex items-center justify-center text-gray-400"
          >
            <Calendar className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}