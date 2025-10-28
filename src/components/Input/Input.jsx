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
  disabled = false,
  prefix, // <-- nuevo prop
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const handleIconClick = () => {
    if (disabled) return; 

    if (type === "datetime-local") {
      inputRef.current?.showPicker?.();
    } else if (type === "password") {
      setShowPassword((prev) => !prev);
    }
  };

  const borderClass =
    showError && error
      ? "border-2 border-red-500"
      : "border border-transparent focus-within:ring-2 focus-within:ring-blue-800";

  // padding extra si hay prefix
  const prefixPadding = prefix ? "pl-12" : "";

  return (
    <div className="w-full relative">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mt-2 ml-3 mb-2">
          {label}
        </label>
      )}

      <div
        className={`flex items-center px-4 py-3 text-sm rounded-full
          bg-[#080C22] text-white shadow-inner shadow-white/10 placeholder-gray-300
          backdrop-blur-sm w-full relative ${borderClass} 
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {prefix}
          </span>
        )}

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
          readOnly={!onChange || disabled}
          disabled={disabled}
          className={`outline-none text-white w-full pr-10 selection:bg-blue-500/30 selection:text-white bg-transparent ${prefixPadding}`}
        />

        {type === "password" && !disabled && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-6 flex items-center justify-center text-gray-400"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}

        {type === "datetime-local" && !disabled && (
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
