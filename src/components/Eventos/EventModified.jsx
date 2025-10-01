import { useState, useEffect } from "react";
import Input from "../../components/Input/Input";
import TextArea from "../Input/InputTextArea";
import ImageUploader from "../../components/Images/ImageUploader";
import SecondaryButton from "../Button/SecondaryButton";
import Entradas from "../Entradas/Entradas";

export default function EventModified({ evento, onUpdate}) {
  const [formData, setFormData] = useState({ ...evento });
  const [hasChanges, setHasChanges] = useState(false);
  const [touched, setTouched] = useState(true);

  useEffect(() => {
    setHasChanges(JSON.stringify(formData) !== JSON.stringify(evento));
  }, [formData, evento]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getPreviewSrc = (value) =>
    value instanceof File ? URL.createObjectURL(value) : value;

  return (
    <div className="lg:col-span-7">
      {/* Banner */}
      {formData.bannerUrl ? (
        <ImageUploader
          onFileSelect={(file) => handleChange("bannerUrl", file)}
          aspect="aspect-[11/4]"
          value={getPreviewSrc(formData.bannerUrl)}
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
          <Input
            label="Nombre del evento"
            placeholder={evento?.nombre}
            value={formData.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
          />

          <Input
            label="Fecha de inicio"
            placeholder={evento?.inicioAt}
            value={formData.inicioAt}
            onChange={(e) => handleChange("inicioAt", e.target.value)}
          />

          <Input
            label="Fecha de fin"
            placeholder={evento?.finAt}
            value={formData.finAt}
            onChange={(e) => handleChange("finAt", e.target.value)}
          />
        </div>

        {/* Ubicación y portada */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
          <Input
            label="Direccion del evento"
            placeholder={evento.lugar?.direccion}
            value={formData.lugar?.direccion || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                lugar: { ...prev.lugar, direccion: e.target.value },
              }))
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
          {formData.portadaUrl ? (
            <ImageUploader
              onFileSelect={(file) => handleChange("portadaUrl", file)}
              aspect="aspect-[20/13]"
              value={getPreviewSrc(formData.portadaUrl)}
            />
          ) : (
            <div className="w-full aspect-[20/13] flex items-center justify-center bg-gray-800 text-gray-500 rounded-lg">
              Sin portada
            </div>
          )}
          <TextArea
            label="Descripcion del evento"
            value={formData.descripcion}
            onChange={(e) => handleChange("descripcion", e.target.value)}
          />
        </div>

        {/* Entradas */}
        <div className="pt-10 border-t border-white/50">
          <h3 className="text-white text-2xl font-bold mb-4">Entradas</h3>
            <Entradas
              entradas={formData.entradas || []}
              setEntradas={(newEntradas) =>
                setFormData((prev) => ({ ...prev, entradas: newEntradas }))
              }
              touched={touched}
            />
        </div>

        <div className="relative pb-13">
            <div className="absolute right-2 max-w-xl">
                <SecondaryButton text="Actualizar datos" onClick={() => onUpdate(formData)} />
            </div>
        </div>
      </div>
    </div>
  );
}



