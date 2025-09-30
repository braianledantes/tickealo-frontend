import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getEventoById } from "../../api/eventos";

import Input from "../../components/Input/Input";
import TextArea from "../../components/InputTextArea";
import ImageUploader from "../../components/Images/ImageUploader";
import BankCard from "../../components/BankCard";
import MiembrosList from "../../components/Eventos/MiembroList";
import LocationEventSelector from "../../components/LocationEventSelector/LocationEventSelector";
import { AuthContext } from "../../context/AuthContext";

export default function UnEvento() {
  const { id } = useParams();
  const { getValidadoresProductora } = useContext(AuthContext);

  const [evento, setEvento] = useState(null);
  const [validadoresProductora, setValidadoresProductora] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const dataEvento = await getEventoById(id);
        setEvento(dataEvento);

        // Cargar validadores de la productora
        if (getValidadoresProductora) {
          const dataValidadores = await getValidadoresProductora();
          console.log("Validadores de la productora:", dataValidadores);
          setValidadoresProductora(dataValidadores || []);
        }
      } catch (err) {
        console.error(err);
        setError("Error al cargar los datos del evento o validadores");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // solo depende del id

  if (loading) return <p className="text-white">Cargando evento...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!evento) return <p className="text-white">Evento no encontrado</p>;

  const getPreviewSrc = (value) =>
    value instanceof File ? URL.createObjectURL(value) : value;

  return (
    <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-10 gap-8">
      {/* Columna izquierda */}
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
        <div className="border border-white/10 bg-[#05081b]/40 p-6 space-y-8">
          {/* Nombre y fechas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-4">
            <Input placeholder="Nombre del evento" value={evento.nombre} readOnly />
            <Input
              placeholder="Fecha de inicio"
              value={new Date(evento.inicioAt).toLocaleString("es-AR")}
              readOnly
            />
            <Input
              placeholder="Fecha de fin"
              value={new Date(evento.finAt).toLocaleString("es-AR")}
              readOnly
            />
          </div>

          {/* Ubicación y portada */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-10">
              <Input
                placeholder="Dirección"
                value={evento.lugar?.direccion || ""}
                readOnly
              />
              <LocationEventSelector
                direccion={evento.lugar?.direccion || ""}
                ciudad={evento.lugar?.ciudad || ""}
                provincia={evento.lugar?.provincia || ""}
                latitud={evento.lugar?.latitud}
                longitud={evento.lugar?.longitud}
                readOnly
              />
            </div>

            <div className="space-y-4">
              {evento.portadaUrl ? (
                <ImageUploader
                  onFileSelect={() => {}}
                  aspect="aspect-[20/13]"
                  value={getPreviewSrc(evento.portadaUrl)}
                  readOnly
                />
              ) : (
                <div className="w-full aspect-[20/13] flex items-center justify-center bg-gray-800 text-gray-500 rounded-lg">
                  Sin portada
                </div>
              )}
              <TextArea value={evento.descripcion} readOnly />
            </div>
          </div>

          {/* Entradas */}
          <h3 className="text-white text-2xl font-bold mb-4">Entradas</h3>
          {evento.entradas?.map((entrada, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input placeholder="Tipo de entrada" value={entrada.tipo} readOnly />
              <Input placeholder="Precio" value={entrada.precio} readOnly />
              <Input placeholder="Cantidad" value={entrada.cantidad} readOnly />
            </div>
          ))}

          {/* Cuenta bancaria */}
          <BankCard label="Cuenta bancaria" cuenta={evento.cuentaBancaria} edit={false} />
        </div>
      </div>

      {/* Columna derecha - Validadores */}
      <div className="lg:col-span-3 space-y-6">
        {/* Validadores del evento */}
        <div className="rounded-2xl border border-white/10 bg-[#05081b]/40 p-6">
          <h3 className="text-white text-xl font-bold mb-4">Validadores del evento</h3>
            <MiembrosList
            miembros={validadoresProductora || []}
            onEliminar={null}
            loading={false}
          />
        </div>

      </div>
    </div>
  );
}
