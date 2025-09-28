import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const EventCard = ({ event }) => {
  const isActive = new Date(event.inicioAt) > new Date();

  return (
    <div className="bg-white/5 rounded-xl overflow-hidden shadow-lg">
      <img
        src={event.portadaUrl}
        alt={event.nombre}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{event.nombre}</h3>
        <p className="text-sm text-gray-300">{event.descripcion}</p>
        <p className="text-sm text-gray-400">
          {format(new Date(event.inicioAt), 'dd MMM yyyy HH:mm', { locale: es })}
        </p>
        <p className="text-sm text-gray-400">
          {event.lugar.direccion}, {event.lugar.ciudad}, {event.lugar.provincia}
        </p>
        {isActive && (
          <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-emerald-600 bg-emerald-200 rounded-full">
            Activo
          </span>
        )}
      </div>
    </div>
  );
};

export default EventCard;

