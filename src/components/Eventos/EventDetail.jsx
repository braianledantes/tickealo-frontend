import ImageUploader from "../../components/Images/ImageUploader";
import TertiaryButton from "../Button/TertiaryButton";
import { MapPin } from "lucide-react";
import { formatearFecha } from "../../utils/formatear";
import EntradaCard from "../Entradas/EntradaCard";

export default function EventDetail({ evento, onDelete }) {
  const getPreviewSrc = (value) =>
    value instanceof File ? URL.createObjectURL(value) : value;

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

      {/* Datos básicos */}
      <div className="border border-white/10 bg-[#05081b]/40 p-6 ">
        <h1 className="tracking-wider text-white font-semibold text-xl">{evento.nombre}</h1>
        <div className="text-blue-800 flex justify-start gap-2 mt-4">
          <MapPin size={14} />
          <span className="text-sm tracking-wider text-blue-800 font-semibold pb-2">
            {evento.lugar.direccion}
          </span>
        </div>

		<p className="text-white text-sm md:text-base lg:text-lg mt-2 tracking-wide border-b-[0.5px] border-white/20 pb-2 break-words overflow-hidden">
		{evento.descripcion}
		</p>


        {/* Fecha */}
        <p className="py-2 text-[#999] font-semibold tracking-wider">
          {(() => {
            const date = new Date(evento.inicioAt);
            const fecha = date
              .toLocaleDateString("es-AR", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
              .toUpperCase();

            const hora = date.getHours().toString().padStart(2, "0");
            const minutos = date.getMinutes().toString().padStart(2, "0");

            return `${fecha} • ${hora}:${minutos} HS`;
          })()}
        </p>

        {/* Entradas debajo de la fecha */}
        <div className="mt-4">
          {evento.entradas?.map((entrada, i) => (
            <EntradaCard
              key={i}
              tipo={entrada.tipo}
              precio={entrada.precio}
              priceValueOverride={entrada.precio}
              disabled={false} 
            />
          ))}
        </div>

		<p className="text-blue-800/50 italic tracking-wider text-center py-4">Así verán los usuarios tu evento.</p>

        <div className="flex justify-between items-center pb-10 pt-6 border-t border-white/10">
          <div className="grid grid-cols-1 space-y-2">
            <span className="text-white text-sm tracking-wider">
              Fecha fin del evento: {formatearFecha(evento.finAt)}
            </span>
            <span className="text-white/70 text-sm tracking-wider italic">
              Ultima actualizacion: {formatearFecha(evento.createdAt)}
            </span>
          </div>
          <div>
            {onDelete && <TertiaryButton text="Eliminar" onClick={onDelete} />}
          </div>
        </div>
      </div>
    </div>
  );
}