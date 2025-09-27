import { useState, useRef } from "react";
import { Camera, Trash } from "lucide-react";

export default function ImageUploaderInput({
  onFileSelect,
  placeholder = "Subir imagen",
  className = "",
  label, // <-- label opcional
}) {
  const [fileData, setFileData] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    setFileData({
      url: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
    });
    onFileSelect?.(file);
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleRemove = () => {
    setFileData(null);
    onFileSelect?.(null);
    inputRef.current.value = null;
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}

      {fileData ? (
        <div className="flex items-center justify-between border rounded-2xl px-3 py-2 bg-[#080C22] text-white shadow-inner shadow-white/10">
          <div className="flex items-center gap-3">
            <img
              src={fileData.url}
              alt="preview"
              className="w-10 h-10 object-cover rounded-md"
            />
            <div className="flex flex-col text-sm">
              <span className="font-medium truncate">{fileData.name}</span>
              <span className="text-gray-400 text-xs">{fileData.size}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-500 hover:text-red-400"
            title="Remover imagen"
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div
          className="flex items-center gap-2 cursor-pointer border rounded-2xl px-3 py-2 bg-[#080C22] text-gray-400"
          onClick={() => inputRef.current.click()}
        >
          <Camera className="w-5 h-5" />
          <span>{placeholder}</span>
        </div>
      )}

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
