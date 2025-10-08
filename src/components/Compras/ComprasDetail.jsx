import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useCompras } from "../../hooks/useCompras";
import { formatearFecha } from "../../utils/formatearFecha";
import { EstadoCompra} from "../FeedBack/Estados";
import LoadingSpinner from "../LoadingSpinner";
import IconButton from "../Button/IconButton";
import TertiaryButton from "../Button/TertiaryButton";

export default function ComprasDetail({ compraId, onClose, onActualizar}) {
  const { getCompraId, aceptarCompra, cancelarCompra } = useCompras();
  const [compra, setCompra] = useState();
  const [closing, setClosing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompra = async () => {
    const data = await getCompraId(compraId);
    setCompra(data);
    setLoading(false);
    console.log(data);
    };
    fetchCompra();
  }, [compraId, getCompraId]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose(); 
    }, 300); 
  };

  const handleAceptarCompra = async (compraId) => {
    setLoading(true);
    setError("");
    try {
      await aceptarCompra(compraId);
      const data = await getCompraId(compraId);
      setCompra(data);
      onActualizar?.(data);
    }catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarCompra = async (compraId) => {
    setLoading(true);
    setError("");
    try {
      await cancelarCompra(compraId);
      const data = await getCompraId(compraId);
      setCompra(data);
      onActualizar?.(data);
    }catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };


  if (loading) return (
    <main className="fixed inset-0 bg-black/40 w-full top-0 flex blur-auto justify-end items-start z-50 overflow-auto scrollbar-none">
        <LoadingSpinner />
    </main>
    );

  if (!compra) return null;   
  return (
    <div className="fixed inset-0 bg-black/40 w-full top-0 flex blur-auto justify-end items-start z-50 overflow-auto scrollbar-none">
      <div className={`${closing ? "animate-slide-out-right" : "animate-slide-in-right"  } text-white bg-[#05081b] shadow-2xl border border-white/20 w-full max-w-xl p-8 space-y-4`}>

        <div className="grid grid-cols-2">
            <h4 className="text-white font-bold text-lg">COMPRA ID #{compra.id}</h4>
            <div className="flex justify-end">
              <IconButton icon={<X />} onClick={handleClose} />
            </div>
        </div>

        <div className="pb-4 border-b-2 border-white/20">
            <h3>TITULAR DE LA COMPRA</h3>
            <div className="flex items-center gap-3 pt-2">
                {compra.cliente.imagenPerfilUrl ? (
                    <img
                    src={compra.cliente.imagenPerfilUrl}
                    alt={compra.nombre}
                    className="w-12 h-12 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                    {compra.cliente.nombre?.[0]?.toUpperCase() || "U"}
                    </div>
                )}
                <div>
                    <p className="text-white text-xl font-semibold">{compra.cliente.nombre}{" "}{compra.cliente.apellido}</p>
                    <p className="text-gray-400 text-sm">{compra.cliente.telefono}</p>
                </div>
            </div>
        </div>

        
        <div className="pb-4 border-b-2 border-white/20">
            <h3>DETALLE</h3>
            <div className="space-y-2 sm:space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <p>Estado de compra</p>
                <EstadoCompra estadoCompra={compra.estado} className="lg:ml-33"/>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 -mt-1">
                <p>Fecha de compra</p>
                <p className="lg:text-right">{formatearFecha(compra.createdAt)}</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <p>Ultima actualizacion</p>
                <p className="lg:text-right">{formatearFecha(compra.updatedAt)}</p>
              </div>

            </div>
        </div>

        <div className="pb-4 border-b-2 border-white/20">
            <h3>EVENTO</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <img src={compra.tickets[0].entrada.evento.bannerUrl} alt={compra.tickets[0].entrada.evento.nombre} className="aspect-[11/4]" />
                <div className="text-left space-y-2">
                    <p>{compra.tickets[0].entrada.evento.nombre}</p>
                    <p>{formatearFecha(compra.tickets[0].entrada.evento.inicioAt)}</p>
                </div>
            </div>  
        </div>


        <div className="pb-4 border-b-2 border-white/20">
            <h3>RESUMEN</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 space-y-2 tracking-wider font-semibold">
                <p>Cantidad</p>
                <p className="lg:text-right">Precio Unidad</p>
            </div>
            {compra.tickets.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <p> Entrada {compra.tickets[0].entrada.tipo} x{compra.tickets.length} </p>
                    <p className="lg:text-right">${compra.tickets[0].entrada.precio * compra.tickets.length}</p>
                </div>
            )}
            <div className="grid grid-cols-2 mt-8 font-semibold tracking-wide text-xl text-[#90E0EF]">
                <p>TOTAL</p>
                <p className="text-right">{compra.monto}</p>
            </div>
        </div>

        <div className="text-gray-300">
          <h3>COMPROBANTE</h3>
          {compra.comprobanteTransferencia && (
            <img src={compra.comprobanteTransferencia} alt="Comprobante" className="mt-4 rounded-lg w-full" />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-40">
          <TertiaryButton text="ACEPTAR" onClick={() => handleAceptarCompra(compra.id)} bg="bg-green-400"/>
          <TertiaryButton text="CANCELAR" onClick={() => handleCancelarCompra(compra.id)}/>
        </div>

      </div>
    </div>
  );
}