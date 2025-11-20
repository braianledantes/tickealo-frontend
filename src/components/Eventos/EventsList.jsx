import EventBanner from "./EventBanner";
import EventCard from "./EventCard";
import EventGuide from "./EventGuide";

export default function EventsList({ viewType = 'grid', eventos, onEventClick }) {

  if (!eventos || eventos.length === 0) {
    return <EventGuide />;
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