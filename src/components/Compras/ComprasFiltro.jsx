import { useEffect, useState } from "react";
import { useCompras } from "../../hooks/useCompras";
import ButtonFilter from "../Button/ButtonFilter";
import Dropdown from "../Button/Dropdown";
import ComprasLoading from "./ComprasLoading";

export default function ComprasFiltro({ onFiltrar }) {
  const { getCompras } = useCompras();
  const [contadores, setContadores] = useState({
    pendiente: 0,
    aceptada: 0,
    rechazada: 0,
    iniciada: 0,
  });
  const [comprasBase, setComprasBase] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [filtroFecha, setFiltroFecha] = useState("todo");

  useEffect(() => {
    const fetchCompras = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getCompras(1);
        const compras = response.data || [];
        setComprasBase(compras);

        const counts = compras.reduce(
          (acc, c) => {
            const estado = c.estado?.toLowerCase();
            if (estado.includes("pendiente")) acc.pendiente++;
            else if (estado.includes("aceptada")) acc.aceptada++;
            else if (estado.includes("rechazada") || estado.includes("cancelada"))
              acc.rechazada++;
            else acc.iniciada++;
            return acc;
          },
          { pendiente: 0, aceptada: 0, rechazada: 0, iniciada: 0 }
        );

        setContadores(counts);
        onFiltrar("todos", compras);
      } catch (err) {
        setError("Error cargando filtros de compras");
      } finally {
        setLoading(false);
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

  const aplicarFiltros = (estado, rangoFecha) => {
    let filtradas = [...comprasBase];
    const ahora = new Date();

    // 🔹 Filtrar por estado
    if (estado !== "todos") {
      filtradas = filtradas.filter((c) =>
        c.estado?.toLowerCase().includes(estado)
      );
    }

    // 🔹 Filtrar por fecha
    filtradas = filtradas.filter((c) => {
      const fecha = new Date(c.createdAt);
      switch (rangoFecha) {
        case "hoy":
          return (
            fecha.getDate() === ahora.getDate() &&
            fecha.getMonth() === ahora.getMonth() &&
            fecha.getFullYear() === ahora.getFullYear()
          );
        case "semana":
          const inicioSemana = new Date(ahora);
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

    onFiltrar(estado, filtradas);
  };

  return (
    <div className="space-y-6 pb-6">

      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-14 md:gap-6">
        <ButtonFilter
          text={`TODAS (${Object.values(contadores).reduce((a, b) => a + b, 0)})`}
          onClick={() => handleFiltroClick("todos")}
          active={filtroActivo === "todos"}
        />
        <ButtonFilter
          text={`PENDIENTE (${contadores.pendiente})`}
          onClick={() => handleFiltroClick("pendiente")}
          active={filtroActivo === "pendiente"}
        />
        <ButtonFilter
          text={`ACEPTADA (${contadores.aceptada})`}
          onClick={() => handleFiltroClick("aceptada")}
          active={filtroActivo === "aceptada"}
        />
        <ButtonFilter
          text={`RECHAZADA (${contadores.rechazada})`}
          onClick={() => handleFiltroClick("rechazada")}
          active={filtroActivo === "rechazada"}
        />
        <ButtonFilter
          text={`INICIADA (${contadores.iniciada})`}
          onClick={() => handleFiltroClick("iniciada")}
          active={filtroActivo === "iniciada"}
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
