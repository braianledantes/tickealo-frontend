import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children, type = "default" }) {
  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "error":
        return "border-red-500 bg-red-50";
      case "success":
        return "border-green-500 bg-green-50";
      case "warning":
        return "border-yellow-500 bg-yellow-50";
      default:
        return "border-gray-200 bg-white";
    }
  };

  const getTitleStyles = () => {
    switch (type) {
      case "error":
        return "text-red-800";
      case "success":
        return "text-green-800";
      case "warning":
        return "text-yellow-800";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-md mx-auto bg-white rounded-lg shadow-xl border-l-4 ${getTypeStyles()}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-black bg-[#05081b]">
          <h3 className={`text-lg font-semibold ${getTitleStyles()}`}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6  bg-[#010030]">
          {children}
        </div>
      </div>
    </div>
  );
}