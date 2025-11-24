import MiembrosList from "../components/Miembros/MiembroList";
import MiembrosLoading from "../components/Miembros/MiembrosLoading";
import MiembroBuscar from "../components/Miembros/MiembrosBuscar";
import { useEquipo } from "../hooks/useEquipo";

export default function Equipo() {
  const {
    loading,
    error,
    equipo,
    agregarMiembroEquipo,
    eliminarMiembroEquipo,
  } = useEquipo();

  const handleAgregarDesdeBusqueda = async (emailUsuario) => {
    await agregarMiembroEquipo(emailUsuario);
  };

  const handleEliminar = async (email) => {
    await eliminarMiembroEquipo(email);
  };

  return (
    <div className="p-10">
      <div className="bg-[#05081b]/40 rounded-2xl shadow-2xl p-8 border border-white/20 mb-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Equipo</h2>

        <p className="flex justify  text-[#A5A6AD] text-sm font-light mb-4">
          Recordá: El usuario debe estar registrado en la plataforma!
        </p>

        <MiembroBuscar onAgregar={handleAgregarDesdeBusqueda} />

        {/* Mostrar error si no se encuentra usuario */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {loading ? (
          <MiembrosLoading />
        ) : (
          <MiembrosList
            miembros={equipo}
            text="VALIDADORES ACTUALES"
            onEliminar={handleEliminar}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
