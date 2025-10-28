import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Dropdown({
  options = [],
  value = "",
  onChange,
  placeholder = "Selecciona una opción",
  textSize = "text-sm",
  className = "",
  error = "", 
  showError="",
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (opt) => {
    onChange(opt);
    setOpen(false);
  };

  // Borde rojo si hay error
  const borderClass = error && showError ? "border-2 border-red-500" : "border border-white/20";

  return (
    <div className={`relative w-full ${className}`}>
      {/* Botón principal */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex justify-between items-center w-full rounded-full px-4 py-2
          text-white uppercase tracking-wide ${textSize}
          bg-transparent focus:outline-none focus:ring-3 focus:ring-[#03045E]
          transition-all duration-300 cursor-pointer
          ${borderClass} 
        `}
      >
        <span className={value ? "text-white" : "text-white/50"}>
          {value || placeholder}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 hover:text-[#03045E]" strokeWidth={3} />
        ) : (
          <ChevronDown className="w-4 h-4 hover:text-[#03045E]" strokeWidth={3} />
        )}
      </button>

      {/* Menú desplegable animado */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="
              absolute left-0 top-full mt-2 w-full bg-[#05081b]/80 backdrop-blur-lg
              rounded-2xl shadow-lg border border-white/20 overflow-auto z-20 max-h-70
            "
          >
            {options.map((opt) => (
              <li
                key={opt.value || opt}
                onClick={() => handleSelect(opt.value || opt)}
                className={`
                  px-4 py-2 cursor-pointer text-white
                  hover:bg-[#03045E]/50 transition-colors
                  ${value === (opt.value || opt) ? "bg-[#00B4D8]/10" : ""}
                `}
              >
                {opt.label || opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Mensaje de error opcional */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
