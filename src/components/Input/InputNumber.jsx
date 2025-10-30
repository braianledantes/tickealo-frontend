import React, { useEffect, useState, useRef } from "react";
import { X, Plus } from "lucide-react";
import IconButton from "../Button/IconButton";

export default function InputNumber({
  value = "",
  onChangeValue,
  placeholder = "Teléfono",
  autofocus = false,
  prefix = "54",
  label,
  error,
  showError,
  disabled = false,
}) {
  const [internalValue, setInternalValue] = useState(value);
  const [showPrefix, setShowPrefix] = useState(!!prefix);
  const inputRef = useRef(null);

  useEffect(() => {
    const numeric = value.replace(/\D/g, "");
    setInternalValue(numeric);
  }, [value]);


  useEffect(() => {
    if (prefix) setShowPrefix(true);
  }, [prefix]);

  const handleChange = (e) => {
    const clean = e.target.value.replace(/\D/g, "");
    setInternalValue(clean);
    onChangeValue?.(clean);
  };

  const handleClearInput = () => {
    setInternalValue("");
    onChangeValue?.("");
  };

  const handleRemovePrefix = () => {
    setShowPrefix(false);
  };

  const borderClass =
    showError && error
      ? "border-2 border-red-500"
      : "border border-transparent focus-within:ring-2 focus-within:ring-blue-800";

  return (
    <>
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
          {showPrefix && (
            <div className="flex items-center text-gray-400 mr-3 select-none">
              <Plus size={16} className="mr-1" />
              <span className="text-sm">{prefix}</span>
            </div>
          )}

          <input
            ref={inputRef}
            type="tel"
            value={internalValue}
            onChange={handleChange}
            placeholder={placeholder}
            autoFocus={autofocus}
            disabled={disabled}
            className="outline-none text-white w-full bg-transparent placeholder-gray-400 selection:bg-blue-500/30 selection:text-white"
          />

          {internalValue && !disabled && (
            <button
              type="button"
              onClick={handleClearInput}
              className="absolute right-6 flex items-center justify-center text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {showError && error && (
          <p className="text-red-500 text-sm mt-2 ml-3">{error}</p>
        )}
      </div>

      {/* Mostrar solo si el prefijo está visible */}
      {showPrefix && (
        <div className="flex justify-between px-3 mt-2">
          <p className="text-[#999]">¿Prefieres sin prefijo?</p>
          <div className="flex items-center">
            <button
              onClick={handleRemovePrefix}
              className="text-[#BD4C4C] bg-transparent border-none cursor-pointer"
            >
              Borrar
            </button>
            <IconButton
              onClick={handleRemovePrefix}
              icon={<X color="#BD4C4C" size={20} />}
              bg="bg-none"
              className="p-0"
            />
          </div>
        </div>
      )}
    </>
  );
}
