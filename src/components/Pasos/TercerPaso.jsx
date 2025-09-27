import { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ImageUploader from "../Images/ImageUploader";

export default function TercerPaso({ onBack, onSubmit, initialData }) {
  const [portada, setPortada] = useState(initialData.portada || null);
  const [descripcion, setDescripcion] = useState(initialData.descripcion || "");
  const [error, setError] = useState("");


  const handleContinue = () => {
    if (!portada) return setError("Debes subir una portada");
    if (!descripcion.trim()) return setError("La descripción es obligatoria");

    onSubmit({ portada, descripcion });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-transparent overflow-hidden">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">3. Portada y Descripción</h3>

       {/* Portada */}
        <ImageUploaderInput placeholder="Tamaño 20:13" onFileSelect={(file) => console.log(file)}  label={"Sube una imagen de portada"}/>

        <Input
        placeholder="Descripcion del evento"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        name="descripcion"
        />

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-4 mt-4">
        <Button type="button" text="Atrás" onClick={onBack} />
        <Button type="button" text="Finalizar" onClick={handleContinue} />
      </div>
    </div>
  );
}
