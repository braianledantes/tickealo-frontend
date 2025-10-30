import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import Button from "../Button/Button";
import ImageUploader from "../Images/ImageUploader";
import TextArea from "../Input/InputTextArea";
import ErrorModal from "../Modal/ErrorModal";

export default function TercerPaso({ onBack, onSubmit, initialData }) {
  const [portada, setPortada] = useState(initialData.portada || null);
  const [descripcion, setDescripcion] = useState(initialData.descripcion || "");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false); // 🔹 Nuevo estado

  const handleContinue = async () => {
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
    setLoading(true); // 🔹 Mostrar el spinner

    try {
      await onSubmit({ portada, descripcion }); // ⏳ espera la creación
    } catch (err) {
      console.error("Error al crear evento:", err);
      setError("Ocurrió un error al crear el evento");
    } finally {
      setLoading(false); // 🔹 Ocultar el spinner
    }
  };

  return (
    <div className="mb-20 max-w-5xl mx-auto relative">
      {/* Overlay de carga */}
      {loading && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl z-10">
          <svg
            className="animate-spin h-10 w-10 text-white mb-4"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <p className="text-white text-lg font-semibold">Creando evento...</p>
        </div>
      )}

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

          {/* Descripción */}
          <div className="flex flex-col h-full justify-between">
            <TextArea
              label="Descripción del evento"
              placeholder="Escribe la descripción aquí..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              name="descripcion"
              maxLength={200}
              error={
                descripcion.trim().length < 10 ? "Mínimo 10 caracteres" : ""
              }
              touched={touched}
            />

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>

        <div className="absolute mb-2 flex space-y-4 w-full px-8 bottom-0 left-0 justify-between">
          <div className="bottom-2 left-4 w-[80px]">
            <Button onClick={onBack} disabled={loading}>
              <ArrowLeft />
            </Button>
          </div>

          <div className="bottom-2 right-4 w-[250px]">
            <Button onClick={handleContinue} disabled={loading}>
              {loading ? "Creando evento..." : "Crear Evento"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
