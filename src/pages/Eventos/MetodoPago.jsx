import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mpImg from "../../assets/mp.png";
import bancoImg from "../../assets/banco.png";

const METODOS = [
  { key: "mercadopago", label: "MercadoPago", img: mpImg },
  { key: "transferencia", label: "Transferencia bancaria", img: bancoImg },
];

export default function MetodoPago() {
  const [selected, setSelected] = useState("transferencia");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #010030 0%, #00033d 50%, #160078 100%)' }}>
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="w-full max-w-xl mx-auto">
          {/* Título alineado a la izquierda */}
          <h2 className="text-3xl font-bold text-white mb-6 text-left">Nuevo evento</h2>

          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-white/80 hover:text-white flex items-center gap-2"
            >
              <span className="text-2xl">←</span>
              <span className="text-sm">Paso 3 de 6</span>
            </button>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">¿Cómo querés cobrar?</h1>

          <div className="flex flex-col gap-4 mb-10">
            {METODOS.map((m) => (
              <button
                key={m.key}
                onClick={() => setSelected(m.key)}
                className={`flex items-center justify-between w-full px-6 py-5 rounded-xl bg-[#18181b] transition border-none ${
                  selected === m.key ? "ring-2 ring-[#00b4d8]" : ""
                }`}
                style={{ minHeight: 64 }}
              >
                <div className="flex items-center gap-4">
                  <img src={m.img} alt={m.label} className="h-8 w-8 object-contain" />
                  <span className="text-white text-lg font-medium">{m.label}</span>
                </div>
                <span>
                  {selected === m.key ? (
                    <span className="inline-block w-6 h-6 rounded border-2 border-[#00B4D8] bg-[#00B4D8] flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect width="16" height="16" rx="4" fill="#00B4D8"/>
                        <path d="M5 8.5L7 10.5L11 6.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  ) : (
                    <span className="inline-block w-6 h-6 rounded border-2 border-white flex items-center justify-center"></span>
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => navigate("/eventos/data")}
              className="bg-[#00B4D8] hover:bg-[#90e0ef] text-white font-semibold px-8 py-3 rounded-lg transition"
            >
              Continuar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}