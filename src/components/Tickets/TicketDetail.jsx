import { useState, useEffect} from "react";
import { X } from "lucide-react";
// import { formatearFecha } from "../../utils/formatearFecha";
import LoadingSpinner from "../LoadingSpinner";
import IconButton from "../Button/IconButton";
import { useEventosList} from "../../hooks/useEventosList"

export default function TicketDetail({ ticketId, onClose}) {
  const [closing, setClosing] = useState(false);
  const {ticketsEvento} = useEventosList();
  const [ticket, setTicket] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompra = async () => {
      const data = await ticketsEvento(ticketId);
      console.log(data)
      setTicket(data);
      setLoading(false);
    };
    fetchCompra();
  }, [ticketId, ticketsEvento]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (loading)
    return (
      <main className="fixed inset-0 bg-black/40 w-full top-0 flex blur-auto justify-end items-start z-50 overflow-auto scrollbar-none">
        <LoadingSpinner />
      </main>
    );

  return (
    <div className="fixed inset-0 bg-black/40 w-full top-0 flex blur-auto justify-end items-start z-50 overflow-auto scrollbar-none">
      <div
        className={`${
          closing ? "animate-slide-out-right" : "animate-slide-in-right"
        } text-white bg-[#05081b] shadow-2xl border border-white/20 w-full max-w-xl p-8 space-y-4`}
      >
        <div className="grid grid-cols-2">
          <h4 className="text-white font-bold text-lg">
            TICKET ID #{ticket.id}
          </h4>
          <div className="flex justify-end">
            <IconButton icon={<X />} onClick={handleClose} />
          </div>
        </div>

        <div className="pb-4 border-b-2 border-white/20">
          <h3>TITULAR DE LA COMPRA</h3>
          <div className="flex items-center gap-3 pt-2">
            {ticket.validatedBy.cliente.imagenPerfilUrl ? (
              <img
                src={ticket.validatedBy.cliente.imagenPerfilUrl}
                alt={ticket.validatedBy.cliente.nombre}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                {ticket.validatedBy.cliente.nombre?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <div>
              <p className="text-white text-xl font-semibold">
                {ticket.validatedBy.cliente.nombre} {ticket.validatedBy.cliente.apellido}
              </p>
              <p className="text-gray-400 text-sm">{ticket.validatedBy.cliente.telefono}</p>
            </div>
          </div>
        </div>

        <div className="pb-4 border-b-2 border-white/20">
          <h3>DETALLE</h3>
          <div className="space-y-2 sm:space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <p>Estado de compra</p>
              <p> {ticket.estado}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 -mt-1">
              <p>Fecha de compra</p>
              <p className="lg:text-right">
                {formatearFecha(compra.createdAt)}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <p>Última actualización</p>
              <p className="lg:text-right">
                {formatearFecha(compra.updatedAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="pb-4 border-b-2 border-white/20">
          <h3>EVENTO</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <img
              src={compra.tickets[0].entrada.evento.bannerUrl}
              alt={compra.tickets[0].entrada.evento.nombre}
              className="aspect-[11/4]"
            />
            <div className="text-left space-y-2 px-3">
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
              <p>
                Entrada {compra.tickets[0].entrada.tipo} x{compra.tickets.length}
              </p>
              <p className="lg:text-right">
                ${compra.tickets[0].entrada.precio}
              </p>
            </div>
          )}
          <div className="grid grid-cols-2 mt-8 font-semibold tracking-wide text-xl text-[#90E0EF]">
            <p>TOTAL</p>
            <p className="text-right">{compra.monto}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
