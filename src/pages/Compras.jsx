import { useState, useEffect } from "react";
import ComprasFiltro from "../components/Compras/ComprasFiltro";
import ComprasList from "../components/Compras/ComprasList";
import { useCompras } from "../hooks/useCompras";

export default function Compras() {
  const { paginarCompras } = useCompras();

  const [comprasFiltradas, setComprasFiltradas] = useState({
    data: [],
    pagination: { page: 1, hasNextPage: false, hasPreviousPage: false, total: 0 },
  });
  const [estadoActivo, setEstadoActivo] = useState(undefined);
  const [filtroFecha, setFiltroFecha] = useState("todo");
  const [error, setError] = useState("");

  const actualizarCompra = (compraActualizada) => {
    setComprasFiltradas(prev => ({
      ...prev,
      data: prev.data.map(c => c.id === compraActualizada.id ? compraActualizada : c)
    }));
  };

  // Carga de compras desde backend con estado y paginación
  const cargarPagina = async (page = 1, estado = estadoActivo, fecha = filtroFecha) => {
    try {
      const response = await paginarCompras({ estado, page, limit: 10 });
      if (!response) return;

      let data = response.data;

      if (fecha !== "todo") {
        const ahora = new Date();
        const inicioSemana = new Date(ahora);
        data = data.filter(c => {
          const fechaCompra = new Date(c.createdAt);
          switch (fecha) {
            case "hoy":
              return fechaCompra.toDateString() === ahora.toDateString();
            case "semana":
              inicioSemana.setDate(ahora.getDate() - ahora.getDay());
              return fechaCompra >= inicioSemana && fechaCompra <= ahora;
            case "mes":
              return fechaCompra.getMonth() === ahora.getMonth() && fechaCompra.getFullYear() === ahora.getFullYear();
            case "anio":
              return fechaCompra.getFullYear() === ahora.getFullYear();
            default:
              return true;
          }
        });
      }

      setComprasFiltradas({
        data,
        pagination: {
          page,
          hasNextPage: response.pagination.hasNextPage,
          hasPreviousPage: response.pagination.hasPreviousPage,
          total: response.pagination.total
        }
      });
    } catch (err) {
      setError("Error cargando las compras.");
      console.error(err);
    }
  };


  const aplicarFiltro = ({ estado, fecha }) => {
    setEstadoActivo(estado);
    setFiltroFecha(fecha);
    cargarPagina(1, estado, fecha); // pasar los valores directamente
  };

  useEffect(() => { cargarPagina(1); }, []);
  return (
    <div className="p-10">
      <div className="bg-[#05081b]/40 rounded-2xl shadow-2xl p-8 border border-white/20 mb-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Entradas</h2>
        <p className="text-gray-200 mb-8">
          Controla y gestiona los pagos de entradas recibidos por tus clientes de forma rápida y segura.
        </p>

        <ComprasFiltro onFiltrar={aplicarFiltro} />

        <ComprasList
          compras={comprasFiltradas.data}
          text="TODAS LAS COMPRAS"
          pagination={comprasFiltradas.pagination}
          onNextPage={() => cargarPagina(comprasFiltradas.pagination.page + 1)}
          onPrevPage={() => cargarPagina(comprasFiltradas.pagination.page - 1)}
          onActualizar={actualizarCompra}
        />

        {error && <p className="text-red-200 mt-8">{error}</p>}
      </div>
    </div>
  );
}
