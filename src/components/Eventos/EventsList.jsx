import EventBanner from "./EventBanner";
import EventCard from "./EventCard";

export default function EventsList({ viewType = 'grid', eventos, onEventClick }) {

  if (!eventos || eventos.length === 0) {
    return <div className="text-center text-gray-400 py-20">No hay eventos disponibles</div>;
  }

  if (viewType === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((evento) => (
          <EventCard key={evento.id} evento={evento} onClick={onEventClick} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {eventos.map((evento) => (
        <EventBanner key={evento.id} evento={evento} onClick={onEventClick} />
      ))}
    </div>
  )
}