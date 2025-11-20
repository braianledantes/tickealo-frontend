import { useEffect, useState } from "react";
import { useCompras } from "../../hooks/useCompras";
import ButtonFilter from "../Button/ButtonFilter";
import Dropdown from "../Button/Dropdown";
import ComprasLoading from "./ComprasLoading";

export default function ComprasFiltro({ onFiltrar }) {
  const { getCompras, cargarComprasPorEstado, compras, comprasAceptadas, comprasRechazadas, comprasPendientes, loading, error } = useCompras();

  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [filtroFecha, setFiltroFecha] = useState("todo");


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
    aplicarFiltros(estado, filtroFecha);
  };

  const handleFiltroFecha = (value) => {
    setFiltroFecha(value);
    aplicarFiltros(filtroActivo, value);
  };

  const aplicarFiltros = (comprasArray, rangoFecha) => {
    const ahora = new Date();
    const inicioSemana = new Date(ahora);

    const filtradas = comprasArray.filter((c) => {
      const fecha = new Date(c.createdAt);
      switch (rangoFecha) {
        case "hoy":
          return (
            fecha.getDate() === ahora.getDate() &&
            fecha.getMonth() === ahora.getMonth() &&
            fecha.getFullYear() === ahora.getFullYear()
          );
        case "semana":
          inicioSemana.setDate(ahora.getDate() - ahora.getDay());
          return fecha >= inicioSemana && fecha <= ahora;
        case "mes":
          return (
            fecha.getMonth() === ahora.getMonth() &&
            fecha.getFullYear() === ahora.getFullYear()
          );
        case "anio":
          return fecha.getFullYear() === ahora.getFullYear();
        default:
          return true;
      }
    });

    onFiltrar(filtradas);
  };


  return (
    <div className="space-y-6 pb-6">

      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-14 md:gap-6">
        <ButtonFilter
          text={`TODAS (${compras?.data?.length || 0})`}
          onClick={() => handleFiltroClick(compras.data)}
          active={filtroActivo === "todos"}
        />
        <ButtonFilter
          text={`PENDIENTE (${comprasPendientes?.data?.length || 0})`}
          onClick={() => handleFiltroClick(comprasPendientes.data)}
          active={filtroActivo === "pendiente"}
        />
        <ButtonFilter
          text={`ACEPTADA (${comprasAceptadas?.data?.length || 0})`}
          onClick={() => handleFiltroClick(comprasAceptadas.data)}
          active={filtroActivo === "aceptada"}
        />
        <ButtonFilter
          text={`RECHAZADA (${comprasRechazadas?.data?.length || 0})`}
          onClick={() => handleFiltroClick(comprasRechazadas.data)}
          active={filtroActivo === "rechazada"}
        />

        <Dropdown
            value={filtroFecha}
            onChange={(value) => handleFiltroFecha(value)}
            options={[
                { value: "todo", label: "Todo el tiempo" },
                { value: "hoy", label: "Hoy" },
                { value: "semana", label: "Esta semana" },
                { value: "mes", label: "Este mes" },
                { value: "anio", label: "Este año" },
            ]}
        />
      </div>

      {loading && <ComprasLoading  />}
      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
    </div>
  );
}
