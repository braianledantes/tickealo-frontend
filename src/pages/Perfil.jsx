import { ChartColumn, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import IconButton from "../components/Button/IconButton";
import SecondaryButton from "../components/Button/SecondaryButton";
import EventLoading from "../components/Eventos/EventLoading";
import ProfilePictureUploader from "../components/Images/ProfilePictureUploader";
import Input from "../components/Input/Input";
import { usePerfil } from "../hooks/usePerfil";
import PerfilModified from "../components/Perfil/PerfilModified";
import PerfilDetail from "../components/Perfil/PerfilDetail";

export default function Perfil() {
  const {
    error,
    user,
    cantEventos,
    cantValidadores,
    cantSeguidores,
  } = usePerfil();

  const [formData, setFormData] = useState({
    nombre: "",
    cuit: "",
    telefono: "",
    direccion: "",
    username: "",
    email: "",
    imagenPerfil: null
  });

  const [editing, setEditing] = useState(false);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || "",
        cuit: user.cuit || "",
        telefono: user.telefono || "",
        direccion: user.direccion || "",
        username: user.user?.username || "",
        email: user.user?.email || "",
        password: "",
        imagenPerfil: user.imagenUrl || null
      });
    }
  }, [user]);



  return (
    <div className="max-w-7xl w-full mx-auto p-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 mb-4">
        <h2 className="text-3xl font-bold text-white/70">Hola <span className="italic text-white">{formData.username}</span> !</h2>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4">
          <IconButton
            icon={<Pencil />}
            active={editing}
            onClick={() => {
              setEditing((prev) => !prev);
              setShowChart(false);
            }}
          />
          <IconButton
            icon={<ChartColumn />}
            active={showChart}
            onClick={() => {
              setShowChart((prev) => !prev);
              setEditing(false);
            }}
          />
        </div>
      </div>

      {/* Subtítulo */}
      <div className="mb-4">
        {editing ? (
          <span className="font-bold text-sm text-[#A5A6AD] tracking-wide">MODO EDICIÓN</span>
        ) : showChart ? (
          <span className="font-bold text-sm text-[#0077B6] tracking-wide">ESTADÍSTICAS DE RENDIMIENTO</span>
        ) : null}
      </div>

      {/* Perfil */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        <div className="lg:col-span-7 bg-[#05081b]/40 rounded-br-4xl rounded-bl-4xl shadow-2xl p-10 border border-white/20 mb-10">
          {showChart ? (
            <EventLoading type="detail" />
          ) : editing ? (
            <PerfilModified />
          ) : (
            <PerfilDetail />
          )}

          {error && <p className="text-red-400 pt-5 text-center font-medium">{error}</p>}

        </div>

        {/* Columna derecha - Resumen */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-bl-4xl rounded-br-4xl border border-white/10 bg-[#05081b]/40 p-6 space-y-5">
            <h2 className="text-white text-xl font-bold">Resumen</h2>

            <div className="flex justify-between text-white/80 ">
              <span>Eventos cargados</span>
              <span className="font-semibold">{cantEventos}</span>
            </div>

            <div className="flex justify-between text-white/80">
              <span>Mi equipo</span>
              <span className="font-semibold">{cantValidadores}</span>
            </div>

            <div className="flex justify-between text-white/80">
              <span>Seguidores</span>
              <span className="font-semibold">{cantSeguidores}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
