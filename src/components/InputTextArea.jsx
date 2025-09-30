import React, { useState, useRef, useEffect } from "react";

export default function TextArea({
  label,
  placeholder,
  value,
  onChange,
  name,
  maxLength = 200,
  error,
  touched: externalTouched = false, // permite controlar el touched desde el padre
}) {
  const [charCount, setCharCount] = useState(value?.length || 0);
  const textAreaRef = useRef(null);
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.length <= maxLength) {
      onChange?.(e);
      setCharCount(val.length);
    }
  };

  const handleBlur = () => setTouched(true);

  const showError = (touched || externalTouched) && error;

  const borderClass = showError
    ? "border-2 border-red-500"
    : "border border-transparent focus-within:ring-2 focus-within:ring-blue-800";

  return (
    <div className="w-full relative">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mt-2 ml-3 mb-2">
          {label}
        </label>
      )}

      <textarea
        ref={textAreaRef}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`resize-none w-full min-h-[160px] p-4 pb-7 text-white rounded-lg bg-[#080C22] shadow-inner shadow-white/10 placeholder-pink outline-none ${borderClass} selection:bg-blue-500/30 selection:text-white`}
      />

      {/* Contador de caracteres si quedan ≤100 */}
      {maxLength - charCount <= 100 && (
        <div
          className={`absolute bottom-2 right-3 text-xs ${
            maxLength - charCount <= 20 ? "text-red-400" : "text-gray-400"
          }`}
        >
          {maxLength - charCount} caracteres restantes
        </div>
      )}

      {showError && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
}

