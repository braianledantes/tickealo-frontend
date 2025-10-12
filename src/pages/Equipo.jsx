import { AtSign } from "lucide-react";
import { useState } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import MiembrosList from "../components/Miembros/MiembroList";
import MiembrosLoading from "../components/Miembros/MiembrosLoading";
import { useEquipo } from "../hooks/useEquipo";

export default function Equipo() {
  const {
    loading,
    error,
    equipo,
    agregarMiembroEquipo,
    eliminarMiembroEquipo,
  } = useEquipo();

  const [email, setEmail] = useState("");

  const handleAgregar = async () => {
    await agregarMiembroEquipo(email);
  };

  const handleEliminar = async (userEmail) => {
    await eliminarMiembroEquipo(userEmail);
  };

  return (
    <div className="p-10">
      <div className="bg-[#05081b]/40 rounded-2xl shadow-2xl p-8 border border-white/20 mb-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Equipo</h2>

        <div className="border-b border-white/20 mb-6 pb-4 space-y-5">
          <p className="text-white font-light pt-3">
            Ingresa el mail exacto del usuario a quien quieras que sea Validador/a.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <Input
                icon={<AtSign />}
                placeholder="Correo del usuario..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2">
              <Button
                onClick={handleAgregar}
                disabled={loading}
              >Agregar Validador</Button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <p className="flex justify-center text-[#A5A6AD] text-sm font-light">
            Recordá: El usuario debe estar registrado en la plataforma!
          </p>
        </div>

        {/* Lista de miembros*/}
        {loading ? (
          <MiembrosLoading />
        ) : (
          <MiembrosList
            miembros={equipo}
            text="MIEMBROS ACTUALES"
            onEliminar={handleEliminar}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
