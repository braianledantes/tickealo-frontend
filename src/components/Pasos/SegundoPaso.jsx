import { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import BankCard from "../BankCard";
import { X , ArrowRight, ArrowLeft} from "lucide-react";

export default function SegundoPaso({ onNext, onBack, initialData, cuentaBancaria }) {
  const [entradas, setEntradas] = useState(
    initialData.entradas?.length > 0
      ? initialData.entradas
      : [{ tipo: "", precio: 0, cantidad: 0 }]
  );
  const [cancelado, setCancelado] = useState(initialData.cancelado || false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const handleEntradaChange = (index, field, value) => {
    const newEntradas = [...entradas];
    newEntradas[index][field] =
      field === "precio" || field === "cantidad" ? Number(value) : value;
    setEntradas(newEntradas);
  };

  const addEntrada = () => {
    setEntradas([...entradas, { tipo: "", precio: 0, cantidad: 0 }]);
  };

  const removeEntrada = (index) => {
    if (index === 0) return; // nunca eliminar la primera
    setEntradas(entradas.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    setTouched(true);

    if (!cuentaBancaria) {
      setError("No se ha configurado ninguna cuenta bancaria para recibir pagos.");
      return;
    }

    if (entradas.some((e) => !e.tipo || e.precio <= 0 || e.cantidad <= 0)) {
      setError("Completa todos los campos de las entradas.");
      return;
    }

    setError("");
    onNext({ entradas, cuentaBancariaId: cuentaBancaria.id, cancelado });
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="rounded-2xl border border-white/10 bg-[#05081b]/40 p-6 md:p-8 space-y-5">
        {entradas.map((entrada, i) => (
          <div
            key={i}
            className={`relative group
              ${i !== 0 ? "hover:ring-2 hover:ring-blue-500" : ""} 
              transition-all bg-[#0a0f33]/60 rounded-xl p-4 grid grid-cols-1 lg:grid-cols-3 gap-4`}
          >
            {/* Botón eliminar solo visible si no es la primera */}
            {i !== 0 && (
              <button
                type="button"
                onClick={() => removeEntrada(i)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-400 font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity"
                title="Eliminar entrada"
              >
                <X />
              </button>
            )}

            <Input
              placeholder="General, VIP..."
              value={entrada.tipo}
              onChange={(e) => handleEntradaChange(i, "tipo", e.target.value)}
              label="Tipo de entrada"
              error={!entrada.tipo}
              showError={touched}
            />
            <Input
              type="number"
              placeholder="5000"
              value={entrada.precio}
              onChange={(e) => handleEntradaChange(i, "precio", e.target.value)}
              label="Precio"
              error={entrada.precio <= 0}
              showError={touched}
            />
            <Input
              type="number"
              placeholder="200"
              value={entrada.cantidad}
              onChange={(e) => handleEntradaChange(i, "cantidad", e.target.value)}
              label="Cantidad"
              error={entrada.cantidad <= 0}
              showError={touched}
            />
          </div>
        ))}

        <div className="flex gap-4 mt-2">
          <button
            type="button"
            onClick={addEntrada}
            className="text-blue-400 hover:underline"
          >
            + Agregar otra entrada
          </button>
        </div>

        <BankCard  label="Cuenta bancaria vinculada" cuenta={cuentaBancaria} edit={false} />

        <div className="hidden flex items-center mt-4 mb-6">
          <input
            type="checkbox"
            id="cancelado"
            checked={cancelado}
            onChange={(e) => setCancelado(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="cancelado" className="text-white">Evento cancelado</label>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="relative pt-20 flex gap-4">
          <div className="absolute bottom-2 left-4  w-[80px]">
            <Button onClick={onBack}><ArrowLeft /></Button>
          </div>

          <div className="absolute bottom-2 right-4 w-[80px]">
            <Button onClick={handleContinue}><ArrowRight /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}