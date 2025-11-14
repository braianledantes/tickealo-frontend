import { useState } from "react";
import { useCreditos } from "../hooks/useCreditos";
import Historial from "../components/Creditos/Historial";
import SaldoyAcciones from "../components/Creditos/SaldoyAcciones";
import ComprarCreditosModal from "../components/Creditos/ComprarCreditosModal";

export default function CreditosPage() {
  const { saldo, historialCompras} = useCreditos();
  const [openComprar, setOpenComprar] = useState(false);

  return (
    <div
      className="p-6 sm:p-10 min-h-screen"
      style={{ backgroundColor: "#0b1028" }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Saldo y acciones principales */}
        <SaldoyAcciones saldo={saldo} onClick={() => setOpenComprar(true)}/>

        {/* Historial de compras de crédito */}
        <Historial historialCompras={historialCompras}/>
      </div>

      {/* Modal de compra */}
      <ComprarCreditosModal
        open={openComprar}
        onClose={() => setOpenComprar(false)}
      />
    </div>
  );
}
