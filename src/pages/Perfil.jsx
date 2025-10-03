import { useState, useEffect } from "react";
import {useAuth} from "../hooks/useAuth";
import ProfilePictureUploader from "../components/Images/ProfilePictureUploader";
import Input from "../components/Input/Input";
import IconInput from "../components/Input/IconInput";
import SecondaryButton from "../components/Button/SecondaryButton";
import EventLoading from "../components/Eventos/EventLoading";
import { Pencil, ChartColumn } from "lucide-react";

export default function Perfil() {

  const { user } = useAuth();

  console.log (user)

  const [nombre, setNombre] = useState("");
  const [cuit, setCuit] = useState("");
  const [telefono, setTelefono] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [imagenPerfil, setImagenPerfil] = useState(null);

  const [editing, setEditing] = useState(false);
  const [showChart, setShowChart] = useState(false);

  // Actualizamos los estados cuando `user` cambia
  useEffect(() => {
    if (user) {
      setNombre(user.nombre || "");
      setCuit(user.cuit || "");
      setTelefono(user.telefono || "");
      setUsername(user.user?.username || "");
      setEmail(user.user?.email || "");
      setImagenPerfil(user.imagenUrl || null);
    }
  }, [user]);

  const getPreviewSrc = (fileOrUrl) => {
    if (!fileOrUrl) return null;
    return fileOrUrl instanceof File ? URL.createObjectURL(fileOrUrl) : fileOrUrl;
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 mb-4">
            <h2 className="text-3xl font-bold text-white">Hola{" "}{nombre}{" "}! </h2>
    
            {/* Botones de acción */}
            <div className="flex justify-end gap-4">
              <IconInput
                icon={<Pencil />}
                active={editing}
                onClick={() => {
                  setEditing((prev) => !prev);
                  setShowChart(false); 
                }}
              />
              <IconInput
                icon={<ChartColumn />}
                active={showChart}
                onClick={() => {
                  setShowChart((prev) => !prev);
                  setEditing(false); 
                }}
              />
            </div>
          </div>

          {/** SUBTITULO */}
          <div className=" mb-4">
            {editing ? (
                <span className="font-bold text-sm text-[#A5A6AD] tracking-wide">
                  MODO EDICIÓN
                </span>
              ) : showChart ? (
                <span className="font-bold text-sm text-[#0077B6] tracking-wide">
                  ESTADÍSTICAS DEL EVENTO
                </span>
              ) : null}
          </div>

    
          {/* Contenido principal */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            <div className="lg:col-span-7 bg-[#05081b]/40 rounded-br-2xl rounded-bl-2xl shadow-2xl p-8 border border-white/20 mb-20">
              {showChart ? (
                <EventLoading type="detail" />
              ) : editing ? (
                  <h1>Hola</h1>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 space-y-4">
                  <div className="max-h-xl justify-top">
                    <ProfilePictureUploader
                    label="Imagen de Perfil (opcional)"
                    value={getPreviewSrc(imagenPerfil)}
                    onFileSelect={(file) => setImagenPerfil(file)}
                    />
                  </div>

                  <div>
                    <h2 className="text-white/40 font-sm tracking-wide ml-3 ">Informacion Personal.</h2>
                    <Input label="Nombre de la Productora" type="text" value={nombre} error={!nombre} showError={touched} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-5 border-b border-white/20">
                      <Input label="CUIT" type="text" value={cuit} error={!cuit} showError={touched} />
                      <Input label="Teléfono" type="text" value={telefono} error={!telefono} showError={touched} />
                    </div>
                    <div className="pt-5">
                      <Input label="Nombre de Usuario" type="text" value={username} error={!username} showError={touched} />
                      <Input label="Email" type="email" value={email} error={!email} showError={touched} />
                    </div>

                        
                    <div className="relative pb-13 pt-5">
                      <div className="absolute right-2 max-w-xl">
                          <SecondaryButton text="Actualizar datos" />
                          {error && <p className="text-red-400 text-center font-medium">{error}</p>}
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
    
            {/* Columna derecha - Validadores */}
            <div className="lg:col-span-3 space-y-6">
                <div className="rounded-2xl border border-white/10 bg-[#05081b]/40 p-6">
                <h1 className="text-white">Eventos</h1>
                </div>
            </div>
          </div>
    </div>
  );
}
