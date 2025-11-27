import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function SuccessToast({ isOpen, onClose, title, children }) {

  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isOpen) {
      setProgress(100); 
      const timer = setTimeout(() => onClose(), 3000);
      
      const interval = setInterval(() => {
        setProgress((prev) => prev - 1);
      }, 30);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4 flex justify-center animate-fadeIn">
      <div className="relative w-full rounded-t-lg rounded-b-4xl shadow-xl bg-gradient-to-l from-[#05081b] to-[#010030] p-4 overflow-hidden border border-white/10">

        {/* Barra de progreso arriba */}
        <div
          className="absolute top-0 left-0 h-1 bg-green-500 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />

        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider text-green-500 italic px-10">
              {title}
            </h3>
            <div className="mt-1 text-white/90 tracking-wide">
              {children}
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition cursor-pointer ml-4 mt-1"
          >
            <X size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}
