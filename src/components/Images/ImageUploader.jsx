import { useState, useRef } from "react";
import { Camera, X } from "lucide-react";

export default function ImageUploader({
  onFileSelect,
  aspect = "aspect-[11/4]", // por defecto banner
  message = "Arrastrá o subí la imagen de tu evento",
  style = "",
}) {
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
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
    if (inputRef.current) inputRef.current.value = null;
  };

  // Eventos drag & drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFiles(file);
  };

  return (
    <div className="flex flex-col gap-2 w-full relative">
      <div
        className={`w-full ${aspect} border-2 border-dashed ${
          dragOver ? "border-blue-500 bg-blue-50" : "border-black"
        } cursor-pointer flex items-center justify-center bg-[#080C22] overflow-hidden relative ${style}`}
        onClick={() => inputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 pointer-events-none text-center px-2">
            <Camera className="w-8 h-8 mb-1" />
            <span className="text-xs">{message}</span>
          </div>
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