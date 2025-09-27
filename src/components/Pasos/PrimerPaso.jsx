import { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ImageUploader from "../Images/ImageUploader";
import LocationEventSelector from "../../components/LocationEventSelector/LocationEventSelector";

export default function PrimerPaso({ onNext, initialData }) {
  const [nombre, setNombre] = useState(initialData.nombre || "");
  const [inicioAt, setInicioAt] = useState(initialData.inicioAt || "");
  const [finAt, setFinAt] = useState(initialData.finAt || "");
  const [banner, setBanner] = useState(initialData.banner || null);

  const [lugar, setLugar] = useState({
    direccion: initialData.lugar?.direccion || "",
    ciudad: initialData.lugar?.ciudad || "",
    provincia: initialData.lugar?.provincia || "",
    latitud: initialData.lugar?.latitud || null,
    longitud: initialData.lugar?.longitud || null,
  });

  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false); 

  const handleLocationSelect = (location) => {
    if (!location) return;

    setLugar({
      direccion: location.direccion || "",
      ciudad: location.ciudad || "",
      provincia: location.provincia || "",
      latitud: location.latitud,
      longitud: location.longitud,
    });
  };

  const handleContinue = () => {
    setTouched(true); 

    // Campos obligatorios
    if (!nombre || !inicioAt || !finAt || !lugar.direccion) {
      setError("Completa todos los campos requeridos.");
      return;
    }

    // Validar fechas
    const inicioDate = new Date(inicioAt);
    const finDate = new Date(finAt);
    const now = new Date();

    if (isNaN(inicioDate.getTime()) || inicioDate <= now) {
      setError("La fecha de inicio debe ser válida y en el futuro.");
      return;
    }

    if (isNaN(finDate.getTime()) || finDate <= inicioDate) {
      setError("La fecha de finalización debe ser válida y posterior al inicio.");
      return;
    }

    setError("");
    const stepData = { nombre, inicioAt, finAt, banner, lugar };
    onNext(stepData);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
        1. Completa los datos
      </h3>

      <div className="rounded-2xl border border-white/10 bg-[#05081b]/40 overflow-hidden">
        {/* Banner */}
        <ImageUploader
          onFileSelect={setBanner}
          style="rounded-tl-2xl rounded-tr-2xl"
          textPadding="px-8 pt-4"
        />

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            {/* Columna 1: Ubicación y Mapa */}
            
            <div className="flex-1 min-h-[320px]">
              <LocationEventSelector
                  direccion={lugar.direccion}
                  ciudad={lugar.ciudad}
                  provincia={lugar.provincia}
                  onLocationSelect={handleLocationSelect}
              />
            </div>
            

            {/* Columna 2: Nombre, Dirección, Fechas y Botón */}
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-6">
                <Input
                  placeholder="Nombre del evento"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  name="nombre"
                  error={!nombre}
                  showError={touched} 
                />
                <Input
                  placeholder="Dirección del Evento"
                  value={lugar.direccion}
                  onChange={(e) =>
                    setLugar((prev) => ({ ...prev, direccion: e.target.value }))
                  }
                  name="direccion"
                  error={!lugar.direccion}
                  showError={touched}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="datetime-local"
                    value={inicioAt}
                    onChange={(e) => setInicioAt(e.target.value)}
                    name="inicioAt"
                    label="Fecha y hora de inicio"
                    min={new Date().toISOString().slice(0, 16)}
                    error={!inicioAt || new Date(inicioAt) <= new Date()}
                    showError={touched}
                  />
                  <Input
                    type="datetime-local"
                    value={finAt}
                    onChange={(e) => setFinAt(e.target.value)}
                    name="finAt"
                    label="Fecha y hora de fin"
                    min={inicioAt || new Date().toISOString().slice(0, 16)}
                    error={!finAt || new Date(finAt) <= new Date(inicioAt)}
                    showError={touched}
                  />
                </div>

                {error && <p className="text-red-500 ml-3 mb-2 mt-4">{error}</p>}
              </div>

              <div className="flex justify-end mt-8">
                <Button type="button" text="Siguiente" onClick={handleContinue} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}