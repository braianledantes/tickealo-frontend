import { useState } from "react";
import Button from "../Button/Button";
import ImageUploader from "../Images/ImageUploader";
import TextArea from "../Input/InputTextArea";
import { X , ArrowRight, ArrowLeft} from "lucide-react";

export default function TercerPaso({ onBack, onSubmit, initialData }) {
  const [portada, setPortada] = useState(initialData.portada || null);
  const [descripcion, setDescripcion] = useState(initialData.descripcion || "");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const handleContinue = () => {
    setTouched(true);
    // Validaciones
    if (!portada) {
      setError("Debes subir una portada");
      return;
    }
    if (!descripcion.trim()) {
      setError("La descripción es obligatoria");
      return;
    }
    if (descripcion.trim().length < 10) {
      setError("La descripción debe tener al menos 10 caracteres");
      return;
    }

    setError("");
    onSubmit({ portada, descripcion });
  };

  return (
    <div className="mb-20 max-w-5xl mx-auto">
      <div className="relative rounded-2xl border border-white/10 bg-[#05081b]/40 p-6 md:p-8 space-y-5 min-h-[430px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">

          {/* Portada */}
          <div className="flex-1">
            <ImageUploader 
              onFileSelect={(file) => setPortada(file)}
              aspect="aspect-[20/13]"
              message="Arrastrá o subí la portada de tu evento para redes sociales!"
            />
          </div>

          {/* Descripción del evento */}
          <div className="flex flex-col h-full justify-between">
            <TextArea
              label="Descripción del evento"
              placeholder="Escribe la descripción aquí..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              name="descripcion"
              maxLength={200}
              error={descripcion.trim().length < 10 ? "Mínimo 10 caracteres" : ""}
              touched={touched}
            />

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

        </div>

        <div className="absolute mb-2 flex space-y-4 w-full px-8 bottom-0 left-0 justify-between">
         <div className=" bottom-2 left-4  w-[80px]">
            <Button type="button" text={<ArrowLeft />} onClick={onBack} />
          </div>

          <div className=" bottom-2 right-4 w-[250px]">
            <Button type="button" text="Crear Evento" onClick={handleContinue} />
          </div>
        </div>
      </div>
    </div>
  );
}
