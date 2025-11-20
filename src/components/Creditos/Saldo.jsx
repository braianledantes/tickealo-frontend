import { formatNumber } from "../../utils/formatear";
import { ShoppingCart, Info, HandCoins} from "lucide-react";

export default function Saldo({ saldo}) {
  return (
    <div className="rounded-2xl border border-white/15 shadow-2xl p-6 sm:p-8 bg-gradient-to-t from-[#0E1531] to-[#11215D] to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Saldo actual */}
          <div>
              <div className="text-5xl font-bold tracking-tight text-white drop-shadow">
              {formatNumber(saldo)}
              </div>
              <div className="text-sm text-gray-200 mt-1 tracking-wider flex items-center gap-2">
              Créditos disponibles
              <HandCoins color="white" strokeWidth={1}/>
              </div>
              <p className="text-[#CAF0F8] text-sm tracking-wider italic pt-2">* 1 Crédito equivale a una entrada.</p>
          </div>
          <div className="mt-4 text-sm text-right text-[#CAF0F8]/70 tracking-wide italic">
            Usá tus créditos para comprar comisiones, publicar eventos y mantener la actividad de tu cuenta <br />
            No tienen vencimiento y podés recargar cuando quieras.
          </div>
        </div>

        {/* Información adicional */}
        {/* <button className="mt-6 text-sm text-violet-200/90 hover:text-violet-100 inline-flex items-center gap-2 transition-colors">
        <Info size={16} />
        Ver más información sobre créditos
        </button> */}
    </div>
  );
}
