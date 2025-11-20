import { useState, useEffect } from "react";
import ButtonFilter from "../Button/ButtonFilter";
import Dropdown from "../Button/Dropdown";
import { useCompras } from "../../hooks/useCompras";

export default function ComprasFiltro({ onFiltrar }) {
  const { 
    getCompras, 
    cargarComprasPorEstado, 
    compras, 
    comprasAceptadas, 
    comprasRechazadas, 
    comprasPendientes, 
    loading, 
    error 
  } = useCompras();

  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [filtroFecha, setFiltroFecha] = useState("todo");

  // Traer todas las compras al montar
  useEffect(() => {
    const fetchCompras = async () => {
      try {
        await Promise.all([
          getCompras(),
          cargarComprasPorEstado("ACEPTADA"),
          cargarComprasPorEstado("PENDIENTE"),
          cargarComprasPorEstado("RECHAZADA"),
        ]);
      } catch (err) {
        console.log("Error obteniendo todas las compras:", err);
      }
    };
    fetchCompras();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiltroClick = (estado) => {
    setFiltroActivo(estado);
    onFiltrar({ estado, fecha: filtroFecha }); // enviamos estado y fecha
  };

  const handleFiltroFecha = (value) => {
    setFiltroFecha(value);
    onFiltrar({ estado: filtroActivo, fecha: value }); // reaplicamos filtro con fecha
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-14 md:gap-6">
        <ButtonFilter
          text={`TODAS (${compras?.pagination?.total || 0})`}
          onClick={() => handleFiltroClick(undefined)}
          active={filtroActivo === "todos"}
        />
        <ButtonFilter
          text={`PENDIENTE (${comprasPendientes?.pagination?.total || 0})`}
          onClick={() => handleFiltroClick("PENDIENTE")}
          active={filtroActivo === "pendiente"}
        />
        <ButtonFilter
          text={`ACEPTADA (${comprasAceptadas?.pagination?.total || 0})`}
          onClick={() => handleFiltroClick("ACEPTADA")}
          active={filtroActivo === "aceptada"}
        />
        <ButtonFilter
          text={`RECHAZADA (${comprasRechazadas?.pagination?.total || 0})`}
          onClick={() => handleFiltroClick("RECHAZADA")}
          active={filtroActivo === "rechazada"}
        />

        <Dropdown
          value={filtroFecha}
          onChange={handleFiltroFecha}
          options={[
            { value: "todo", label: "Todo el tiempo" },
            { value: "hoy", label: "Hoy" },
            { value: "semana", label: "Esta semana" },
            { value: "mes", label: "Este mes" },
            { value: "anio", label: "Este año" },
          ]}
        />
      </div>

      {loading && <p className="text-blue-800">Cargando...</p>}
      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
    </div>
  );
}
