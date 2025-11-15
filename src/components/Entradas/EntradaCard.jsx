import React from "react";
import { Plus } from "lucide-react"; // Cambié a lucide-react

export default function EntradaCard({
  tipo,
  precio,
  onClick,
  right,
  priceValueOverride,
  disabled = false,
  fechaFin,
}) {
  const tipoColor = tipo.toLowerCase() === "vip" ? "#4da6ff" : "#77c3ff";

  const finalizo =
    disabled ||
    (fechaFin ? new Date(fechaFin).getTime() < new Date().getTime() : false);

  return (
    <div
      onClick={!finalizo && onClick ? onClick : undefined}
      className={`relative flex items-center overflow-hidden my-2 rounded-tr-[30px] rounded-br-[30px] border ${
        finalizo ? "border-[#1b0352]/30" : "border-[#1b1e5e]"
      } shadow-lg hover:shadow-xl cursor-pointer bg-[#0b1030]`}
      style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
    >
      {/* Barra de gradiente */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2"
        style={{
          background: "linear-gradient(180deg, #03055F, #00B4D8, #90E0EF, #CAF0F8)",
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
        }}
      />

      {/* Contenido */}
      <div className="flex-1 py-3.5 px-5">
        <div className="flex items-center gap-1.5">
          <span className="text-[#bbb] text-[14px] tracking-wider font-semibold">ENTRADA</span>
          <span className="text-[20px] font-bold mb-[5px]" style={{ color: tipoColor }}>
            {tipo.toUpperCase()}
          </span>
        </div>

        <div className="flex items-end mt-1">
          <span className="text-white text-[20px] font-bold tracking-[1px]">
            ${Number(priceValueOverride ?? precio).toLocaleString("es-AR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          <span className="text-[#999] text-[12px] mb-[2px] ml-1">
            por persona
          </span>
        </div>
      </div>

      {/* Separador vertical */}
      <div className="w-px h-[70%] border-l border-dashed border-[#666]" />

      {/* Botón derecho */}
      <div className="w-15 flex justify-center items-center bg-[#0b1030]">
        {right ?? <Plus size={24} color="#fff" />}
      </div>

      {/* Overlay si finalizó */}
      {finalizo && (
        <div className="absolute inset-0 bg-black/55 flex items-center justify-center"></div>
      )}
    </div>
  );
}
