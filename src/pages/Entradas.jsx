import { useState } from "react";
import ComprasFiltro from "../components/Compras/ComprasFiltro";
import ComprasList from "../components/Compras/ComprasList";

export default function Entradas() {
  const [comprasFiltradas, setComprasFiltradas] = useState([]);
  const [error, setError] = useState("");

  const actualizarCompra = (compraActualizada) => {
    setComprasFiltradas((prev) =>
      prev.map((c) => (c.id === compraActualizada.id ? compraActualizada : c))
    );
  };

  const handleFiltrar = (estado, compras) => {
    setComprasFiltradas(compras);
  };

  return (
    <div className="p-10">
      <div className="bg-[#05081b]/40 rounded-2xl shadow-2xl p-8 border border-white/20 mb-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Entradas</h2>
        <p className="text-gray-200 mb-8">
          Controla y gestiona los pagos de entradas recibidos por tus clientes de forma rápida y segura.
        </p>

        <ComprasFiltro onFiltrar={handleFiltrar} />

        <ComprasList
          compras={comprasFiltradas}
          text="COMPRAS FILTRADAS"
          onActualizar={actualizarCompra}
        />

        {error && <p className="text-red-200 mt-8">{error}</p>}
      </div>
    </div>
  );
}
