import { useEffect, useState } from "react";
import { useCompras } from "../hooks/useCompras";
import ComprasList from "../components/Compras/ComprasList"
import ComprasLoading from "../components/Compras/ComprasLoading";

export default function Entradas() {
    const { getCompras } = useCompras();
    const [compras, setCompras] = useState([]);
    const [paginas, setPaginas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchCompras = async () => {
          setLoading(true);
          setError("");
          try {
            const response = await getCompras( page ); 

            setPaginas(response.pagination);
            setCompras(response.data);
            setLoading(false)
          } catch (err) {
            setError("Error cargando miembros del equipo");
          } finally {
            setLoading(false);
          }
        };
        fetchCompras();
    }, [page]);

    const handleNextPage = () => {
      if (paginas.hasNextPage) setPage(page + 1);
    };

    const handlePrevPage = () => {
      if (paginas.hasPreviousPage) setPage(page - 1);
    };

    const actualizarCompra = (compraActualizada) => {
      setCompras(prev =>
        prev.map(c => c.id === compraActualizada.id ? compraActualizada : c)
      );
    };

  return (
    <div className="bg-[#05081b]/40 rounded-2xl shadow-2xl p-8 border border-white/20 mb-20 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-4">Entradas</h2>
      <p className="text-gray-200 mb-8">Controla y gestiona los pagos de entradas recibidos por tus clientes de forma rápida y segura.</p>
      
      {loading ? (
        <ComprasLoading />
      ) : (
        <ComprasList
          compras={compras}
          text="TODAS LAS COMPRAS"
          loading={loading}
          pagination={paginas}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          onActualizar={actualizarCompra}
        />
      )}

      <p className="text-red-200 mt-8">{error}</p>

    </div>
  );
}