import ImageUploader from "../../components/Images/ImageUploader";
import ProgressTicket from "../Tickets/ProgressTicket";
import TicketList from "../Tickets/TicketList";
import TicketFiltro from "../Tickets/TicketFiltro";
import { useState } from "react";

export default function EventTickets({ evento, tickets }) {
  // Estado para tickets filtrados
  const [ticketsFiltrados, setTicketsFiltrados] = useState(tickets || []);

  return (
    <div className="lg:col-span-7">
      <div className="px-6 space-y-8">
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
