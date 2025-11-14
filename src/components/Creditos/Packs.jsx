import { formatNumber, formatCurrency } from "../../utils/formatear";
import { useEffect, useState } from "react";
import { Plus, ChevronRight, ChevronLeft } from "lucide-react";
import { useCreditos } from "../../hooks/useCreditos";
import ComprarCreditosModal from "./ComprarCreditosModal";

import Pack1 from "../../assets/100.svg";
import Pack2 from "../../assets/250.svg";
import Pack3 from "../../assets/500.svg";
import Pack4 from "../../assets/1000.svg";
import PacksLoading from "./PacksLoading";

export default function Packs() {
  const { packs, createCreditoPreference } = useCreditos();
  const [packSeleccionado, setPackSeleccionado] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);

  const packIcons = {
    100: Pack1,
    250: Pack2,
    500: Pack3,
    1000: Pack4,
  };

  useEffect(() => {
    if (!packSeleccionado) return;

    createCreditoPreference(packSeleccionado).then((data) =>
      setPreferenceId(data.id)
    );
  }, [packSeleccionado, createCreditoPreference]);

  if (!packs?.length) return <PacksLoading />;

  return (
    <div className="flex items-center gap-2 w-full">
      {/* Flecha izquierda */}
      <button
        onClick={() =>
          document.getElementById("packs-container").scrollBy({
            left: -200,
            behavior: "smooth",
          })
        }
        className="flex md:hidden bg-white/10 border border-white/5 rounded-full p-2 
                   hover:bg-white/20 transition"
      >
        <ChevronLeft color="white" />
      </button>

      {/* Contenedor scrolleable */}
      <div
        id="packs-container"
        className="
          flex gap-4 overflow-x-auto scrollbar-disabled px-2 py-1 
          md:overflow-visible md:flex-wrap 
          flex-1
        "
      >
        {packs.map((pack) => (
          <button
            key={pack.id}
            onClick={() => setPackSeleccionado(pack)} // 👉 pack completo
            className={`
              min-w-[180px] md:min-w-[270px] 
              flex-shrink-0 md:flex-shrink 
              p-4 rounded-2xl border transition-all duration-300 
              transform cursor-pointer bg-[#05081b]/40
              ${
                packSeleccionado?.id === pack.id
                  ? "border-white/40 scale-[1.03] shadow-lg shadow-cyan-500/20"
                  : "border-white/10 hover:bg-white/5 hover:scale-[1.03] hover:shadow-lg hover:shadow-blue-800/5"
              }
            `}
          >
            <div className="grid grid-cols-[40%_60%] text-white w-full items-center">
              <div className="flex justify-center">
                <img
                  src={packIcons[pack.cantidad]}
                  alt={`Pack ${pack.cantidad}`}
                  className="w-18 h-18 object-contain"
                />
              </div>

              <div className="flex flex-col justify-start">
                <span className="flex items-center gap-2 mb-1 font-semibold tracking-wide">
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
          </button>
        ))}
      </div>

      {/* Flecha derecha */}
      <button
        onClick={() =>
          document.getElementById("packs-container").scrollBy({
            left: 200,
            behavior: "smooth",
          })
        }
        className="flex md:hidden bg-white/10 border border-white/20 rounded-full p-2
                   hover:bg-white/20 transition"
      >
        <ChevronRight color="white" />
      </button>

      {/* Modal */}
      {packSeleccionado && (
        <ComprarCreditosModal
          pack={packSeleccionado}       
          preferenceId={preferenceId}    
          onClose={() => {
            setPackSeleccionado(null);
            setPreferenceId(null);
          }}
        />
      )}
    </div>
  );
}
