import { ArrowRight } from "lucide-react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ImageUploader from "../Images/ImageUploader";
import LocationEventSelector from "../Location/LocationEventSelector";
import Dropdown from "../Button/Dropdown";
import { usePrimerPaso } from "../../hooks/Pasos/usePrimerPaso";

export default function PrimerPaso({ onNext, initialData }) {
  const {
    nombre,
    setNombre,
    inicioAt,
    setInicioAt,
    finAt,
    setFinAt,
    banner,
    setBanner,
    lugar,
    setLugar,
    error,
    touched,
    countries,
    selectedCountry,
    handleCountryChange,
    handleContinue,
    handleLocationSelect,
    showOnMap,
  } = usePrimerPaso(initialData, onNext);

  const countryOptions = countries.map((c) => ({
    label: c.name, // lo que se muestra
    value: c.name, // lo que se envía al backend
    iso: c.isoCode, // solo para cálculo del prefijo
  }));

  return (
    <div className="mb-20 max-w-5xl mx-auto">
      <div className="rounded-2xl border border-white/10 bg-[#05081b]/40">
        <div className="p-6 pb-20 md:p-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            {/* Formulario */}
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-6">
                {/* Nombre*/}
                <Input
                  id="nombre"
                  label="Nombre del evento"
                  placeholder="Escribe el nombre aquí"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  name="nombre"
                  error={!nombre}
                  showError={touched}
                />

                {/* País */}
                <Dropdown
                  id="pais"
                  label="País"
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  placeholder="Seleccioná un país"
                  error={!selectedCountry}
                  showError={touched}
                />

                {/* Dirección */}
                <Input
                  id="direccion"
                  label="Dirección"
                  placeholder="Selecciona un punto en el mapa"
                  value={lugar.direccion}
                  onChange={(e) =>
                    setLugar((prev) => ({
                      ...prev,
                      direccion: e.target.value,
                    }))
                  }
                  name="direccion"
                  error={!lugar.direccion}
                  showError={touched}
                  disabled={!selectedCountry}
                />

                {/* Fechas */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                  <Input
                    id="inicioAt"
                    label="Fecha y hora de inicio"
                    type="datetime-local"
                    value={inicioAt}
                    onChange={(e) => setInicioAt(e.target.value)}
                    name="inicioAt"
                    min={new Date().toISOString().slice(0, 16)}
                    error={!inicioAt || new Date(inicioAt) <= new Date()}
                    showError={touched}
                  />

                  <Input
                    id="finAt"
                    label="Fecha y hora de fin"
                    type="datetime-local"
                    value={finAt}
                    onChange={(e) => setFinAt(e.target.value)}
                    name="finAt"
                    min={inicioAt || new Date().toISOString().slice(0, 16)}
                    error={!finAt || new Date(finAt) <= new Date(inicioAt)}
                    showError={touched}
                  />
                </div>

                {error && (
                  <p className="text-red-500 ml-3 mb-20 mt-10">{error}</p>
                )}
              </div>
            </div>

            {/* Mapa */}
            <div className="flex-1 min-h-[320px]">
              <LocationEventSelector
                direccion={lugar.direccion}
                ciudad={lugar.ciudad}
                provincia={lugar.provincia}
                onLocationSelect={handleLocationSelect}
                country={showOnMap?.country}
                capital={showOnMap?.capital}
                iso={showOnMap?.iso}
              />
            </div>
          </div>

          {/* Banner */}
          <div className="mt-8">
            <ImageUploader
              onFileSelect={setBanner}
              label="Banner del evento"
              aspect="aspect-[11/4]"
              message={`Arrastrá o subí el banner de tu evento.
                        Tamaño recomendado: 1200x400px`}
            />
          </div>

          <div className="flex justify-between mt-8">
            <div></div>
            <div className="w-[80px]">
              <Button onClick={handleContinue}>
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
