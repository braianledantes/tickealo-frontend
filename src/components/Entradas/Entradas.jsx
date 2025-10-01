import { useState } from "react";
import Input from "../Input/Input";
import { X } from "lucide-react";

export default function Entradas({ entradas, setEntradas, touched }) {
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

    return(
        <div>
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
        </div>
    )
}