import { formatNumber, formatCurrency } from "../../utils/formatear";
import { useEffect, useState } from "react";
import Modal from "../Modal/ModalCreditos";
import { Plus } from "lucide-react";
import { Wallet } from "@mercadopago/sdk-react";
import { useCreditos } from "../../hooks/useCreditos";

export default function ComprarCreditosModal({ open, onClose}) {
  const { packs, createCreditoPreference } = useCreditos();
  const [packSeleccionado, setPackSeleccionado] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    const pack = packs.find((p) => p.id === packSeleccionado);

    if (pack) {
      createCreditoPreference(pack)
        .then((data) => {
          setPreferenceId(data.id);
        });
    }
    // eslint-disable-next-line
  }, [packSeleccionado]);

  return (
    <Modal open={open} onClose={onClose} title="Comprar créditos">
      <div className="space-y-3">
        {packs.map((pack) => (
          <button
            key={pack.id}
            onClick={() => setPackSeleccionado(pack.id)}
            className={`w-full text-left p-3 rounded-full border transition-colors ${packSeleccionado === pack.id
              ? "bg-white/10 border-white/40"
              : "bg-transparent border-white/10 hover:bg-white/5 cursor-pointer"
              }`}
          >
            <div className="flex items-center justify-between text-white">
              <span className="flex items-center gap-2">
                <Plus size={18} />
                <span className="text-[#CAF0F8] font-regular">{formatNumber(pack.cantidad)}</span> créditos
              </span>
              <span className="opacity-80">
                {formatCurrency(pack.precioARS)}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        {preferenceId && (
          <Wallet
            customization={{ theme: "dark", showValueProp: false }}
            initialization={{ preferenceId: preferenceId }}
          />
        )}
      </div>
    </Modal>
  );
}