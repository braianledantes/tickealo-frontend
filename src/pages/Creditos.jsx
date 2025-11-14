import { useCreditos } from "../hooks/useCreditos";
import Historial from "../components/Creditos/Historial";
import Saldo from "../components/Creditos/Saldo";
import Packs from "../components/Creditos/Packs";

export default function CreditosPage() {
  const { saldo, historialCompras} = useCreditos();

  return (
    <div
      className="p-6 sm:p-10 min-h-screen"
      style={{ backgroundColor: "#0b1028" }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Saldo y acciones principales */}
        <Saldo saldo={saldo}/>

        <Packs />
        {/* Historial de compras de crédito */}
        <Historial historialCompras={historialCompras}/>
      </div>
    </div>
  );
}
