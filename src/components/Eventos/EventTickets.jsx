import ImageUploader from "../../components/Images/ImageUploader";
import ProgressTicket from "../Tickets/ProgressTicket";
import TicketList from "../Tickets/TicketList";
import TicketFiltro from "../Tickets/TicketFiltro";
import { useState } from "react";

export default function EventTickets({ evento, tickets }) {
  const getPreviewSrc = (value) =>
    value instanceof File ? URL.createObjectURL(value) : value;

  // Estado para tickets filtrados
  const [ticketsFiltrados, setTicketsFiltrados] = useState(tickets || []);

  return (
    <div className="lg:col-span-7">
      {/* Banner */}
      {evento.bannerUrl ? (
        <ImageUploader
          onFileSelect={() => {}}
          aspect="aspect-[11/4]"
          value={getPreviewSrc(evento.bannerUrl)}
          readOnly
        />
      ) : (
        <div className="w-full aspect-[11/4] flex items-center justify-center bg-gray-800 text-gray-500 rounded-lg">
          Sin banner
        </div>
      )}

      <div className="border border-white/10 bg-[#05081b]/40 p-6 space-y-8">

        {/* Progreso total del evento */}
        <ProgressTicket evento={evento} ticketsTotalesEvento={tickets.tickets} />
        {/* Filtro de tickets */}
        <TicketFiltro tickets={tickets.tickets} onFiltrar={setTicketsFiltrados} />
        {/* Lista de tickets filtrados */}
        <TicketList tickets={ticketsFiltrados} text="Tickets validados del evento" />
      </div>
    </div>
  );
}
