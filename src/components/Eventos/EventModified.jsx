import { useState, useEffect } from "react";
import Input from "../../components/Input/Input";
import TextArea from "../Input/InputTextArea";
import ImageUploader from "../../components/Images/ImageUploader";
import SecondaryButton from "../Button/SecondaryButton";
import Entradas from "../Entradas/Entradas";

export default function EventModified({ evento, onUpdate }) {
  // Inicializamos solo los campos relevantes
  const [formData, setFormData] = useState({
    nombre: evento.nombre || "",
    descripcion: evento.descripcion || "",
    inicioAt: evento.inicioAt || "",
    finAt: evento.finAt || "",
    cancelado: evento.cancelado || false,
    lugarId: evento.lugar?.id || null,
    entradas: evento.entradas?.map(e => ({
      tipo: e.tipo,
      precio: e.precio,
      cantidad: e.cantidad
    })) || [],
    bannerFile: null,
    portadaFile: null,
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Detecta cambios
    setHasChanges(JSON.stringify(formData) !== JSON.stringify({
      ...evento,
      entradas: evento.entradas?.map(e => ({
        tipo: e.tipo,
        precio: e.precio,
        cantidad: e.cantidad
      })) || [],
      bannerFile: null,
      portadaFile: null
    }));
  }, [formData, evento]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateDatosGeneralesClick = () => {
    const payload = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      inicioAt: formData.inicioAt,
      finAt: formData.finAt,
      cancelado: formData.cancelado,
      lugarId: formData.lugarId,
      entradas: formData.entradas,
    };

    onUpdate(
      payload,
      formData.bannerFile,
      formData.portadaFile
    );
  };

  const getPreviewSrc = (fileOrUrl) => fileOrUrl instanceof File ? URL.createObjectURL(fileOrUrl) : fileOrUrl;

  return (
    <div>
      {/* Banner */}
      <ImageUploader
        onFileSelect={(file) => handleChange("bannerFile", file)}
        aspect="aspect-[11/4]"
        value={getPreviewSrc(formData.bannerFile || evento.bannerUrl)}
        placeholder={
          !formData.bannerFile && !evento.bannerUrl
            ? "Sin banner"
            : undefined
        }
      />

      {/* Datos básicos */}
      <div className="border border-white/10 bg-[#05081b]/40 p-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-4">
          <Input
            label="Nombre del evento"
            placeholder={evento.nombre}
            value={formData.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
          />

          <Input
            type="datetime-local"
            label="Fecha y hora de inicio"
            name="inicioAt"
            value={formData.inicioAt}
            onChange={(e) => handleChange("inicioAt", e.target.value)}
            min={new Date().toISOString().slice(0, 16)} // No permitir fechas pasadas
            error={!formData.inicioAt || new Date(formData.inicioAt) <= new Date()}
            showError={true} // o un estado `touched` si querés mostrar error solo después de interacción
          />

          <Input
            type="datetime-local"
            label="Fecha y hora de fin"
            name="finAt"
            value={formData.finAt}
            onChange={(e) => handleChange("finAt", e.target.value)}
            min={formData.inicioAt || new Date().toISOString().slice(0, 16)} // fin >= inicio
            error={!formData.finAt || new Date(formData.finAt) <= new Date(formData.inicioAt)}
            showError={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
          <Input
            label="Direccion del evento"
            placeholder={evento.lugar?.direccion || ""}
            value={evento.lugar?.direccion || ""}
            onChange={(e) => {}}
            disabled
          />

          <ImageUploader
            onFileSelect={(file) => handleChange("portadaFile", file)}
            aspect="aspect-[11/4]"
            value={getPreviewSrc(formData.portadaFile || evento.portadaUrl)}
            placeholder={
              !formData.portadaFile && !evento.portadaUrl
                ? "Sin portada"
                : undefined
            }
          />
        </div>

        <TextArea
          label="Descripcion del evento"
          value={formData.descripcion}
          onChange={(e) => handleChange("descripcion", e.target.value)}
        />

        {/* Botón actualizar datos generales */}
        <div className="relative pb-13">
          <div className="absolute right-2 max-w-xl">
            <SecondaryButton
              text="Actualizar Generales"
              onClick={handleUpdateDatosGeneralesClick}
              disabled={!hasChanges}
            />
          </div>
        </div>

        {/* Entradas */}
        <div className="pt-10 border-t border-white/50">
          <h3 className="text-white text-2xl font-bold mb-4">Entradas</h3>
          <Entradas
            entradas={formData.entradas}
            setEntradas={(newEntradas) => handleChange("entradas", newEntradas)}
          />
        </div>

        {/* Botón actualizar entradas */}
        <div className="relative pb-13">
          <div className="absolute right-2 max-w-xl">
            <SecondaryButton
              text="Actualizar Entradas"
              onClick={() => {}}
              disabled={!hasChanges}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
