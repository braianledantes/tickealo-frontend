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

  return (
    <div className="mb-20 max-w-5xl mx-auto">
      <div className="rounded-2xl border border-white/10 bg-[#05081b]/40">
        {/* Banner */}
        <ImageUploader
          onFileSelect={setBanner}
          aspect="aspect-[11/4]"
          message="Arrastrá o subí el banner de tu evento."
        />

        <div className="relative p-6 pb-20 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
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

            {/* Formulario */}
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

                <Dropdown
                  options={countries}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  placeholder="Seleccioná un país"
                  error={!selectedCountry}
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
                  disabled={!selectedCountry}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
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

                {error && (
                  <p className="text-red-500 ml-3 mb-20 mt-10">{error}</p>
                )}
              </div>
            </div>

            <div className="absolute bottom-8 right-4 mt-8 w-[80px]">
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
