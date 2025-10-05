import { useEffect, useState } from "react";
import { useCompras } from "../hooks/useCompras";

export default function Entradas() {
    const { getCompras } = useCompras();
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMiembros = async () => {
          setLoading(true);
          setError("");
          try {
            const data = await getCompras();
            setCompras(data);
          } catch (err) {
            setError("Error cargando miembros del equipo");
          } finally {
            setLoading(false);
          }
        };
        fetchMiembros();
    }, []);

    console.log(compras);
  return (
    <div className="bg-[#05081b]/40 rounded-2xl shadow-2xl p-8 border border-white/20 mb-20 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-4">Entradas</h2>
      <p className="text-gray-200">Controla y gestiona los pagos de entradas recibidos por tus clientes de forma rápida y segura.</p>
    </div>
  );
}