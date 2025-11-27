import { useState, useEffect } from "react";
import Input from "../../components/Input/Input";
import TextArea from "../Input/InputTextArea";
import ImageUploader from "../../components/Images/ImageUploader";
import SecondaryButton from "../Button/SecondaryButton";
import Entradas from "../Entradas/Entradas";
import { toLocalDatetime } from "../../utils/formatear";
import { ChevronRight, ChartColumn} from "lucide-react";

export default function EventModified({ evento, onUpdate }) {
  // Inicializamos solo los campos relevantes
  const [formData, setFormData] = useState({
    nombre: evento.nombre || "",
    descripcion: evento.descripcion || "",
    inicioAt: evento.inicioAt || "",
    finAt: evento.finAt || "",
    cancelado: evento.cancelado || false, // ⬅️ switch usa este estado
    lugarId: evento.lugar?.id || null,
    entradas:
      evento.entradas?.map((e) => ({
        tipo: e.tipo,
        precio: e.precio,
        cantidad: e.cantidad,
      })) || [],
    bannerFile: null,
    portadaFile: null,
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Detecta cambios
    setHasChanges(
      JSON.stringify(formData) !==
        JSON.stringify({
          ...evento,
          entradas:
            evento.entradas?.map((e) => ({
              tipo: e.tipo,
              precio: e.precio,
              cantidad: e.cantidad,
            })) || [],
          bannerFile: null,
          portadaFile: null,
        })
    );
  }, [formData, evento]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateDatosGeneralesClick = () => {
    const payload = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      inicioAt: formData.inicioAt,
      finAt: formData.finAt,
      cancelado: formData.cancelado, // ⬅️ incluido
      lugarId: formData.lugarId,
      entradas: formData.entradas,
    };

    onUpdate(payload, formData.bannerFile, formData.portadaFile);
  };

  const getPreviewSrc = (fileOrUrl) =>
    fileOrUrl instanceof File ? URL.createObjectURL(fileOrUrl) : fileOrUrl;
  return (
    <>
    {/* Datos GENERALES */}
    <div>
      {/* Banner */}
      <ImageUploader
        onFileSelect={(file) => handleChange("bannerFile", file)}
        aspect="aspect-[11/4]"
        value={getPreviewSrc(formData.bannerFile || evento.bannerUrl)}
        placeholder={
          !formData.bannerFile && !evento.bannerUrl ? "Sin banner" : undefined
        }
      />
      <div className="bg-[#05081b]/40 p-6 space-y-8 rounded-b-3xl border border-white/20">
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
            value={toLocalDatetime(formData.inicioAt)}
            onChange={(e) => handleChange("inicioAt", e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
          />

          <Input
            type="datetime-local"
            label="Fecha y hora de fin"
            name="finAt"
            value={toLocalDatetime(formData.finAt)}
            onChange={(e) => handleChange("finAt", e.target.value)}
            min={formData.inicioAt || new Date().toISOString().slice(0, 16)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
          <ImageUploader
            onFileSelect={(file) => handleChange("portadaFile", file)}
            aspect="aspect-[4/5]"
            value={getPreviewSrc(formData.portadaFile || evento.portadaUrl)}
            placeholder={
              !formData.portadaFile && !evento.portadaUrl
                ? "Sin portada"
                : undefined
            }
          />
          <Input
            label="Direccion del evento"
            placeholder={evento.lugar?.direccion || ""}
            value={evento.lugar?.direccion || ""}
            onChange={(e) => {}}
            disabled
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
      </div>
    </div>

    {/* ENTRADAS */}
    <div className="bg-[#05081b]/40 p-6 space-y-8 rounded-3xl my-10 border border-white/20">
          <h3 className="text-white text-2xl font-bold mb-4">Entradas</h3>
          <span className="text-white/50 tracking-wider">Podras ver el rendimiento de ventas de las entradas en la sección de</span>
          <p className="text-sm text-gray-200 mt-1 tracking-wider flex items-center gap-2 pb-3">
             <ChartColumn className="w-5 h-5"/> <strong className="text-white">Estadísticas</strong><ChevronRight className="w-5 h-5"/><br></br><strong className="text-white">Estadísticas del Evento</strong>
          </p>
          <Entradas
            entradas={formData.entradas}
            setEntradas={(newEntradas) =>
              handleChange("entradas", newEntradas)
            }
          />

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

    <div>
      {/* cancelar evento */}
      <div className="bg-[#05081b]/40 p-6 rounded-3xl flex justify-between items-center border border-white/20">
        <h3 className="text-red-500 text-md tracking-wider font-medium">
          Cancelar Evento
        </h3>
        <button
          onClick={() => {
            const nuevoValor = !formData.cancelado;
            handleChange("cancelado", nuevoValor);

            const payload = {
              ...formData,
              cancelado: nuevoValor,
            };

            onUpdate(payload, formData.bannerFile, formData.portadaFile);
          }}
          className={`
            w-12 h-6 flex items-center rounded-full transition-colors duration-300
            ${formData.cancelado ? "bg-red-500" : "bg-white/20"}
          `}
        >
          <span
            className={`
              w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300
              ${formData.cancelado ? "translate-x-6" : "translate-x-1"}
            `}
          ></span>
        </button>

      </div>
    </div>
    </>
  );
}
