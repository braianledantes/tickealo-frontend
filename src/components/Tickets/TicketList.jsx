import { formatearFecha } from "../../utils/formatearFecha";
import ComprasDetail from "../Compras/ComprasDetail";
import {EstadoCompra} from "../FeedBack/Estados";

export default function TicketList({ tickets = [], text = "" }) {
  if (!tickets.length) return <div className="text-center text-white/20 uppercase italic tracking-wider font-semibold">No hay tickets validados para mostrar</div>;

  return (
    <div className="space-y-2">
      <h3 className="text-[#A5A6AD] font-bold mb-2 px-4 uppercase tracking-wide">{text}</h3>
      <div className="w-full">
        <ul>
          <li className="p-3 tracking-wider font-semibold mb-3 rounded-full grid place-items-center lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 text-white bg-white/5">
            <span>Id Ticket</span>
            <span className="hidden lg:block md:block">Validador</span>
            <span className="hidden lg:block ">Fecha</span>
            <span className="hidden lg:block ">Entrada</span>
            <span className="hidden lg:block">Estado</span>
            <span>Codigo</span>
          </li>
          {tickets.map((c, i) => {
            const compra = c.user || c.cliente || {};
            const nombre = compra.nombre || compra.username || "Usuario";

            return (
              <li
                key={i}
                className="p-3 items-center place-items-center rounded-full hover:bg-white/5 transition grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 text-white"
              >
                  <span className="font-semibold tracking-wide text-gray-500">#{c.id}</span>
                    <span className="hidden lg:block md:block truncate">{nombre} {compra.apellido}</span>
                    <span className="hidden lg:block text-gray-500">{formatearFecha(c.updatedAt)}</span>
                    <span className="hidden lg:block truncate">{c.entrada.id}</span>
                    <EstadoCompra
                    estadoCompra={c.estado}
                    className="hidden lg:flex items-center break-words text-[clamp(0.30rem,1vw,0.75rem)] leading-tight"
                    />
                    <span className="hidden lg:block md:block truncate">{c.codigoAlfanumerico}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}