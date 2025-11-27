import { X } from "lucide-react";
import { useEffect } from "react";
import SuccessToast from "./SuccesToast";

export default function Modal({ isOpen, onClose, title, children, type = "default" }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (type === "success") {
    return (
      <SuccessToast isOpen={isOpen} onClose={onClose} title={title}>
        {children}
      </SuccessToast>
    );
  }
  
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "error":
        return "border-red-500 bg-red-50";
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
      case "warning":
        return "text-yellow-800";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className={`relative w-full max-w-md mx-auto rounded-l-lg rounded-r-4xl shadow-xl border-l-4 ${getTypeStyles()}`}>

        <div className="flex items-center justify-between p-6 border-b border-black bg-[#05081b] rounded-tr-4xl">
          <h3 className={`text-xl font-semibold tracking-wider uppercase ${getTitleStyles()}`}>
            {title}
          </h3>

          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 bg-[#010030] rounded-br-4xl tracking-wide">
          {children}
        </div>

      </div>
    </div>
  );
}
