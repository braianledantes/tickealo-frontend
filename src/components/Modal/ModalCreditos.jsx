import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Modal({ open, onClose, title, children, footer }) {
  const [isVisible, setIsVisible] = useState(open);
  const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
    if (open) {
      setIsVisible(true);
      setIsClosing(false);
    } else {
      setIsClosing(true);
      // esperamos la duración de la animación (400ms)
      setTimeout(() => setIsVisible(false), 400);
    }
  }, [open]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 blur-auto"
        onClick={onClose}
      />
       <div className={`relative w-full max-w-lg mx-4 rounded-2xl border border-white/15 shadow-2xl p-6 bg-[#060a1f]/95  ${isClosing ? "animate-slideDown" : "animate-slideUp"}`}>
        <div className="grid grid-cols-2  items-center pb-4">
            <h3 className="text-xl text-left font-semibold text-white mb-4">{title}</h3>
            <div className="text-right">
              <button
                title="Cancelar Compra"
                className="text-white text-xl font-bold cursor-pointer"
                onClick={onClose}
              >
                 <X />
              </button>
          </div>
        </div>
        <div className="text-gray-200">{children}</div>
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  )
}