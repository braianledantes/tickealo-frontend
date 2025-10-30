import { useState, useRef, useEffect } from "react";
import { Camera, X } from "lucide-react";

export default function ImageUploader({
  onFileSelect,
  aspect = "aspect-[11/4]",
  message = "Arrastrá o subí la imagen de tu evento",
  style = "",
  value,
  readOnly = false,
  allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"], // formatos permitidos
}) {
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileType, setFileType] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (value && typeof value === "string") {
      setPreview(value);
    }
  }, [value]);

  const handleFiles = (file) => {
    if (!file) return;

    const { type, name } = file;
    setFileType(type);

    if (!allowedTypes.includes(type)) {
      setError(`El archivo "${name}" no es un formato válido (${type}). 
        Solo se permiten imágenes JPG, PNG o GIF.`);
      setPreview(null);
      onFileSelect?.(null);
      return;
    }

    setError("");
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onFileSelect?.(file);
  };

  const handleChange = (e) => handleFiles(e.target.files[0]);

  const handleRemove = () => {
    setPreview(null);
    setFileType(null);
    setError("");
    onFileSelect?.(null);
    if (inputRef.current) inputRef.current.value = null;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files[0]);
  };

  return (
    <div className="flex flex-col gap-2 w-full relative">
      <div
        className={`w-full ${aspect} border-2 border-dashed ${
          dragOver ? "border-blue-500 bg-blue-50" : "border-black"
        } flex items-center justify-center bg-[#080C22] overflow-hidden relative ${style}`}
        onClick={() => !readOnly && inputRef.current.click()}
        onDragOver={readOnly ? undefined : handleDragOver}
        onDragLeave={readOnly ? undefined : handleDragLeave}
        onDrop={readOnly ? undefined : handleDrop}
      >
        {preview ? (
          <>
            <img src={preview} alt="Uploaded" className="w-full h-full object-cover" />
            {!readOnly && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/80 hover:bg-white p-1 rounded-full shadow text-red-500 text-xs"
                title="Remover imagen"
              >
                <X className="w-5 h-5" />
                <span className="text-[10px]">Remover</span>
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 pointer-events-none text-center px-2">
            <Camera className="w-8 h-8 mb-1" />
            <span className="text-xs">{message}</span>
          </div>
        )}
      </div>

      {!readOnly && (
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleChange}
          className="hidden"
        />
      )}

      {/* Mensaje debajo del uploader */}
      {fileType && !error && (
        <p className="text-xs text-gray-400 text-center mt-1">
          Tipo de archivo detectado: <span className="font-semibold text-white">{fileType}</span>
        </p>
      )}

      {error && (
        <p className="text-xs text-red-400 text-center mt-1 font-medium whitespace-pre-line">
          {error}
        </p>
      )}
    </div>
  );
}
