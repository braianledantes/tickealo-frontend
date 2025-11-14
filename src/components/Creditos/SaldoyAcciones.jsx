import { formatNumber } from "../../utils/formatear";
import { ShoppingCart, Info} from "lucide-react";

export default function SaldoyAcciones({ saldo , onClick}) {
  return (
    <div className="rounded-2xl border border-white/15 shadow-2xl p-6 sm:p-8 bg-gradient-to-t from-[#0E1531] to-[#11215D] to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Saldo actual */}
        <div>
            <div className="text-5xl font-bold tracking-tight text-white drop-shadow">
            {formatNumber(saldo)}
            </div>
            <div className="text-sm text-gray-200 mt-1 tracking-wider">
            Créditos disponibles
            </div>
        </div>

        {/* Botón de compra */}
        <button
            onClick={onClick}
            className="inline-flex items-center cursor-pointer gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-colors font-medium"
        >
            <ShoppingCart size={18} />
            Comprar créditos
        </button>
        </div>

        {/* Información adicional */}
        {/* <button className="mt-6 text-sm text-violet-200/90 hover:text-violet-100 inline-flex items-center gap-2 transition-colors">
        <Info size={16} />
        Ver más información sobre créditos
        </button> */}
    </div>
  );
}
