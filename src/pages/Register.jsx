import {useState } from "react";
import {useAuth} from "../hooks/useAuth";
import { PATHS } from "../routes/paths";
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import ButtonLink from '../components/Button/ButtonLink';
import ProfilePictureUploader from "../components/Images/ProfilePictureUploader";
import Logo from "../components/Logo";
import { validarProductora } from "../utils/validarProductora";

export default function Register() {
  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [cuit, setCuit] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [imagenPerfil, setImagenPerfil] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false); 
  
  const { registrarProductora } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    setError("");

    // Validación antes de enviar
    const errores = validarProductora({ nombre, cuit, direccion, telefono, username, email, password });
    if (Object.keys(errores).length > 0) {
      setError(Object.values(errores).join(". "));
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("nombre", nombre);
      formData.append("cuit", cuit);
      formData.append("direccion", direccion);
      formData.append("telefono", telefono);
      formData.append("email", email);
      formData.append("password", password);
      if (imagenPerfil) formData.append("imagenPerfil", imagenPerfil);

      const response = await registrarProductora(formData);

      if (response?.error) {
        setError(response.error);
      } 
    } catch (err) {
      setError("Error al registrar. Intenta nuevamente.\n" + err.response?.data?.message || err.message);
    }
  };


  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#05081b]">
      <div className="absolute top-10"><Logo /></div>

      <div className="justify-center items-center max-w-3xl">
        <h2 className="text-xl font-semibold text-center text-white mb-6">Registrarse</h2>
        <div className="w-70 mx-auto mb-6">
          <ProfilePictureUploader label="Imagen de Perfil (opcional)" onFileSelect={(file) => setImagenPerfil(file)} />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-gray-300 px-2">Datos de la Productora</h1>
            <Input placeholder="Nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} error={!nombre} showError={touched} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="CUIT" type="text" value={cuit} onChange={(e) => setCuit(e.target.value)} error={!cuit} showError={touched} />
              <Input placeholder="Teléfono" type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)}  error={!telefono} showError={touched}  />
            </div>
            <Input placeholder="Dirección" type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)}  error={!direccion} showError={touched}  />
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-gray-300 px-2">Datos del Dueño</h1>
            <Input placeholder="Nombre de Usuario" type="text" value={username} onChange={(e) => setUsername(e.target.value)}  error={!username} showError={touched} />
            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}  error={!email} showError={touched}  />
            <Input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)}  error={!password} showError={touched} />
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <Button text="Registrarse" />
            {error && <p className="text-red-400 text-center font-medium">{error}</p>}
          </div>
        </form>

        <p className="text-center mt-6 text-gray-200">
          ¿Ya tienes una cuenta? <ButtonLink to={PATHS.LOGIN} text="Inicia sesión aquí " />
        </p>
      </div>
    </div>
  );
}