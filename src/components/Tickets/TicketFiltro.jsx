import { useEffect, useState } from "react";
import Dropdown from "../Button/Dropdown";

export default function TicketFiltro({ tickets = [], onFiltrar }) {
  const [filtroFecha, setFiltroFecha] = useState("HASTA HOY");
  const [filtroEntrada, setFiltroEntrada] = useState("TODAS LAS ENTRADAS");
  const [entradasDisponibles, setEntradasDisponibles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Entradas únicas según tipo
    const entradas = Array.from(
      new Set(tickets.map((t) => t.entrada?.tipo))
    )
      .filter(Boolean)
      .map((tipo) => ({ tipo })); // formato consistente para dropdown

    setEntradasDisponibles(entradas);

    // Inicialmente mostramos todos los tickets
    onFiltrar(tickets);

    setLoading(false);
  }, [tickets, onFiltrar]);

  const aplicarFiltros = (rangoFecha, entradaTipo) => {
    let filtradas = [...tickets];
    const ahora = new Date();

    // Filtrar por fecha
    filtradas = filtradas.filter((t) => {
      const fecha = new Date(t.createdAt);
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

    // Filtrar por tipo de entrada
    if (entradaTipo && entradaTipo !== "TODAS LAS ENTRADAS") {
      filtradas = filtradas.filter((t) => t.entrada?.tipo === entradaTipo);
    }

    onFiltrar(filtradas);
  };

  const handleFiltroFecha = (value) => {
    setFiltroFecha(value);
    aplicarFiltros(value, filtroEntrada);
  };

  const handleFiltroEntrada = (entradaTipo) => {
    setFiltroEntrada(entradaTipo);
    aplicarFiltros(filtroFecha, entradaTipo);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dropdown de fecha */}
        <Dropdown
          value={filtroFecha}
          onChange={handleFiltroFecha}
          options={[
            { value: "HASTA HOY", label: "Todo el tiempo" },
            { value: "hoy", label: "Hoy" },
            { value: "semana", label: "Esta semana" },
            { value: "mes", label: "Este mes" },
            { value: "anio", label: "Este año" },
          ]}
        />

        {/* Dropdown de entradas */}
        <Dropdown
          value={filtroEntrada}
          onChange={handleFiltroEntrada}
          options={[
            { value: "TODAS LAS ENTRADAS", label: "Todas las entradas" },
            ...entradasDisponibles.map((e) => ({
              value: e.tipo,
              label: e.tipo,
            })),
          ]}
        />
      </div>

      {loading && <span>Cargando...</span>}
    </div>
  );
}
