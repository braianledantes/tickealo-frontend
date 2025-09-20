import { useState, useRef } from "react";
import { Camera } from "lucide-react";

export default function ProfilePictureUploader({ onFileSelect, textPadding = "px-2 py-1" }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleFiles = (file) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onFileSelect?.(file);
  };

  const handleChange = (e) => {
    handleFiles(e.target.files[0]);
  };

  const handleRemove = () => {
    setPreview(null);
    onFileSelect?.(null);
    inputRef.current.value = null;
  };

  return (
    <div className="flex items-center gap-4 relative">
      {/* Círculo con imagen */}
      <div
        className="w-20 h-20 rounded-full overflow-hidden border border-gray-300 cursor-pointer flex items-center justify-center bg-gray-100"
        onClick={() => inputRef.current.click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400">Foto</span>
        )}
      </div>

      {/* Ícono de cámara */}
      <div
        className="absolute bottom-2 left-14 w-7 h-7 p-1 flex items-center justify-center bg-blue-600 border-2 border-white rounded-full shadow-md cursor-pointer"
        onClick={() => inputRef.current.click()}
      >
        <Camera className="text-white text-sm" />
      </div>

      {/* Texto y botón de acción */}
      <div className={`flex flex-col items-start justify-center ${textPadding}`}>
        <label
          className="text-gray-600 cursor-pointer hover:underline text-sm"
          onClick={() => inputRef.current.click()}
        >
          {preview ? "Cambiar foto de Perfil" : "Subir foto de Perfil"}
        </label>
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-500 text-sm mt-1 hover:underline"
          >
            Remover
          </button>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}


