import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import IconButton from "../Button/IconButton";
import { X , HandCoins, Phone, AtSign, ChevronRight} from "lucide-react";
import TertiaryButton  from "../Button/TertiaryButton";

export default function MiembroDetails({ miembro,loading, onEliminar,  onClose}) {
  const [closing, setClosing] = useState(false);
  
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  if (!miembro) { return null;}
  return (
    <div className="fixed inset-0 bg-black/40 w-full top-0 flex blur-auto justify-end items-start z-50 overflow-auto scrollbar-none">
      <div
        className={`${
          closing ? "animate-slide-out-right" : "animate-slide-in-right"
        } text-white bg-[#05081b] shadow-2xl border border-white/20 w-full max-w-xl p-8 space-y-4 h-screen `}
      >
        <div className="grid grid-cols-2">
          <h4 className="text-white font-bold text-lg">
            DETALLE
          </h4>
          <div className="flex justify-end">
            <IconButton icon={<X />} onClick={handleClose} />
          </div>
        </div>

        <div className="pb-4 border-b-[0.5px] border-white/20">
          <div className="flex items-center gap-3 pt-2">
            {miembro.imagenPerfilUrl ? (
              <img
                src={miembro.imagenPerfilUrl}
                alt={miembro.nombre}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                {miembro.nombre?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <div>
              <p className="text-white text-xl font-semibold">
                {miembro.nombre} {miembro.apellido}
              </p>
              <p className="text-gray-400 text-sm">@{miembro.user.username}</p>
            </div>
          </div>
        </div>

        <div className="pb-4 border-b-[0.5px] border-white/20">
            <h3>CONTACTO</h3>

            <div className="flex flex-col gap-2 pt-2">

                {/* Email */}
                <div className="flex items-center gap-2">
                <AtSign className="w-5 h-5 text-[#A5A6AD]" />
                <p className="text-gray-400 text-md">
                    {miembro.user.email}
                </p>
                </div>

                {/* Teléfono */}
                <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#A5A6AD]" />
                <p className="text-gray-400 text-md">
                    {miembro.telefono}
                </p>
                </div>

            </div>
        </div>

        <div className="grid grid-cols-1 pt-4 pb-10 ">
          <span className="text-white/50 tracking-wider">Podras ver el rendimiento de este usuario en la selección de un </span>
          <p className="text-sm text-gray-200 mt-1 tracking-wider flex items-center gap-2">
            <strong className="text-white">Evento</strong><ChevronRight className="w-5 h-5"/><strong className="text-white">Estadísticas</strong><ChevronRight className="w-5 h-5"/><br></br><strong className="text-white">Estadísticas de Validadores</strong>
          </p>
        </div>

        <div className=" pb-4">
            <TertiaryButton
                text={loading ? '...Eliminando' : 'Eliminar Miembro'}
                onClick={() => onEliminar(miembro.user.email)}
                bg="bg-red-500"
            />
        </div>
      </div>
    </div>
  );
}