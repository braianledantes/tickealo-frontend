import Input from "../Input/Input";
import { usePerfil } from "../../hooks/usePerfil";
import { useState, useEffect } from "react";
import SecondaryButton from "../Button/SecondaryButton";
import { X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function PerfilPassword({ open, onClose }) {
  const { logout } = useAuth();
  const { user, actualizarPerfil } = usePerfil();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(""); // 🔴 estado para errores visibles

  useEffect(() => {
    if (user) {
      setFormData({
        password: "",
        confirmPassword: "",
      });
      setError("");
    }
  }, [user]);

  if (!open) return null;

  const handleActualizarPassword = async () => {
    // Validaciones antes de enviar
    if (!formData.password || !formData.confirmPassword) {
      setError("Por favor, completa ambos campos de contraseña.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Crear FormData solo con password
    const payload = new FormData();
    payload.append("password", formData.password);

    try {
      await actualizarPerfil(payload);
      await logout();
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      setError("Hubo un error al actualizar la contraseña.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-[#0b1030] p-6 rounded-2xl w-120">
        <div className="grid grid-cols-2 items-center">
          <h2 className="text-white text-lg font-bold mb-4">
            Cambiar Contraseña
          </h2>
          <div className="text-right">
            <button
              className="text-white text-xl font-bold cursor-pointer"
              onClick={onClose}
            >
              <X />
            </button>
          </div>
        </div>

        <div className="mt-2 mx-auto">
          <p className="text-[#999] text-center mb-4">
            Al cambiar tu contraseña, se cerrará tu sesión y deberás iniciar sesión nuevamente.
          </p>

          <Input
            label="Correo electrónico"
            value={user?.user?.email || ""}
            onChange={() => {}}
          />

          <div className="h-[1px] bg-white/50 my-6"></div>

          <Input
            type="password"
            label="Nueva contraseña"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setError("");
            }}
          />
          <Input
            type="password"
            label="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
              setError("");
            }}
          />
        </div>

        <div className="mt-6">
          <SecondaryButton
            text="Actualizar Contraseña"
            onClick={handleActualizarPassword}
          />

          {error && (
            <p className="text-red-500 text-sm mt-3 text-center font-semibold">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
