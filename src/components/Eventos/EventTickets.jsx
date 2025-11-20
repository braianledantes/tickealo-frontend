import ProgressTicket from "../Tickets/ProgressTicket";
import TicketList from "../Tickets/TicketList";

export default function EventTickets({ evento, tickets }) {
  // Solo tomamos los tickets validados
  const ticketsValidados = tickets?.tickets?.filter(t => t.estado === "VALIDADO") || [];

  return (
    <div className="lg:col-span-7">
      <div className="px-6 space-y-8">
        {/* Progreso total del evento */}
        <ProgressTicket evento={evento} ticketsTotalesEvento={tickets?.tickets} />

        {/* Lista de tickets validados */}
        <TicketList tickets={ticketsValidados} text="Tickets validados del evento" />
      </div>
    </div>
  );
}
