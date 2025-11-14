import { useState, useMemo } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { X, ArrowRight, ArrowLeft, TriangleAlert } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function SegundoPaso({ onNext, onBack, initialData }) {
  const { user } = useAuth();
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
    if (index === 0) return;
    setEntradas(entradas.filter((_, i) => i !== index));
  };

  const totalUsado = useMemo(() => {
    return entradas.reduce((acc, e) => acc + (e.cantidad || 0), 0);
  }, [entradas]);

  const saldoRestante = user.creditosDisponibles - totalUsado;

  const handleContinue = () => {
    setTouched(true);

    if (entradas.some((e) => !e.tipo || e.precio <= 0 || e.cantidad <= 0)) {
      setError("Completa todos los campos de las entradas.");
      return;
    }

    if (saldoRestante < 0) {
      setError("No tienes suficientes créditos para crear estas entradas.");
      return;
    }

    setError("");
    onNext({ entradas, cancelado });
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
            {i !== 0 && (
              <button
                type="button"
                onClick={() => removeEntrada(i)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-400 font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity"
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
              prefix={initialData.lugar.isoCodigoPais}
              min={0}
            />

            <Input
              type="number"
              placeholder="200"
              value={entrada.cantidad}
              onChange={(e) =>
                handleEntradaChange(i, "cantidad", e.target.value)
              }
              label="Cantidad"
              error={entrada.cantidad <= 0}
              showError={touched}
              min={0}
              max={user.creditosDisponibles}
            />
          </div>
        ))}

        {/* Botón agregar entrada */}
        <div className="flex gap-4 mt-2">
          <button
            type="button"
            onClick={addEntrada}
            className="text-blue-400 hover:underline"
          >
            + Agregar otra entrada
          </button>
        </div>

        {/* MENSAJE DE SALDO RESTANTE */}
        <div className="mt-2">
          {saldoRestante >= 0 ? (
            <p className="text-white/60 text-sm italic">
              {saldoRestante === 0
                ? "Tu saldo después de crear este evento será de 0 créditos."
                : `Tu saldo quedará en ${saldoRestante} créditos.`}
            </p>
          ) : (
            <p className="text-red-500/70 text-sm italic">
              Te faltan {Math.abs(saldoRestante)} créditos para cubrir todas las
              entradas.
            </p>
          )}
        </div>

        {error && <p className="text-red-500 tracking-wider font-semibold flex items-center gap-2"><TriangleAlert/>{error}</p>}

        {/* Navegación */}
        <div className="relative pt-20 flex gap-4">
          <div className="absolute bottom-2 left-4 w-[80px]">
            <Button onClick={onBack}>
              <ArrowLeft />
            </Button>
          </div>

          <div className="absolute bottom-2 right-4 w-[80px]">
            <Button onClick={handleContinue}>
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
