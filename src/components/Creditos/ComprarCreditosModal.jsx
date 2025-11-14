import { formatNumber, formatCurrency } from "../../utils/formatear";
import { useState } from "react";
import Modal from "../Modal/ModalCreditos";
import { Plus } from "lucide-react";
import { Wallet } from "@mercadopago/sdk-react";
import LoadingSpinner from "../LoadingSpinner";
import IconButton from "../Button/IconButton";
import { X , HandCoins} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

import Pack1 from "../../assets/100.svg";
import Pack2 from "../../assets/250.svg";
import Pack3 from "../../assets/500.svg";
import Pack4 from "../../assets/1000.svg";

export default function ComprarCreditosModal({ pack, preferenceId,  onClose}) {
  const { user } = useAuth();
  const [closing, setClosing] = useState(false);

  const packIcons = {
    100: Pack1,
    250: Pack2,
    500: Pack3,
    1000: Pack4,
  };
  
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!pack) { return null;}

  const creditosTotales = user.creditosDisponibles + pack.cantidad; 
  return (
    <div className="fixed inset-0 bg-black/40 w-full top-0 flex blur-auto justify-end items-start z-50 overflow-auto scrollbar-none">
      <div
        className={`${
          closing ? "animate-slide-out-right" : "animate-slide-in-right"
        } text-white bg-[#05081b] shadow-2xl border border-white/20 w-full max-w-xl p-8 space-y-4 h-screen `}
      >
        <div className="grid grid-cols-2">
          <h4 className="text-white font-bold text-lg">
            PACK DE CRÉDITO SELECCIONADO
          </h4>
          <div className="flex justify-end">
            <IconButton icon={<X />} onClick={handleClose} />
          </div>
        </div>

        {/* PACK SELECCIONADO */}
        <div className="grid grid-cols-[20%_80%] text-white w-full items-center pb-4 border-b-[0.5px] border-white/20">
          <div className="flex justify-center">
            <img
              src={packIcons[pack.cantidad]}
              alt={`Pack ${pack.cantidad}`}
              className="w-18 h-18 object-contain"
            />
          </div>

          {/* Info del pack */}
          <div className="flex flex-col justify-start">
            <span className="flex items-center gap-2 mb-1 font-semibold tracking-wider text-2xl" >
              <Plus size={18} strokeWidth={3} />
              <span className="text-[#CAF0F8]">
                {formatNumber(pack.cantidad)}
              </span>{" "}
              créditos
            </span>

            <span className="opacity-80 text-lg font-light text-left ml-1 italic tracking-wider">
              {formatCurrency(pack.precioARS)}
            </span>
          </div>

        </div>

        <div className="grid grid-cols-1 py-4">
          <span className="text-white/50 tracking-wider">Tu saldo después de esta compra quedará en</span>
          <span className="text-white tracking-wider font-semibold text-3xl italic my-4"> {creditosTotales}</span>
          <div className="text-sm text-gray-200 mt-1 tracking-wider flex items-center gap-2">
            Créditos disponibles
            <HandCoins color="white" strokeWidth={1}/>
          </div>
        </div>

        {/* WALLET */}
        <div className="mt-6 w-full bg-white/80 rounded-xl pb-1 min-h-[80px]">
          {preferenceId && (
            <Wallet
              customization={{ theme: "dark", showValueProp: false }}
              initialization={{ preferenceId }}
            />
          )}

        </div>
      </div>
    </div>
  );
}