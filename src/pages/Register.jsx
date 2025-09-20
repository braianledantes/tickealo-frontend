import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PATHS } from "../routes/paths";
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';

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
  const navigate = useNavigate();
  const { isAuthenticated, registrarProductora } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATHS.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validación básica
    if (!nombre || !cuit || !direccion || !telefono || !email || !password || !username) {
      setError("Por favor, completa todos los campos");
      return;
    }

    try {
      // Creamos FormData para enviar archivo + datos
      const formData = new FormData();
      formData.append("username", username);
      formData.append("nombre", nombre);
      formData.append("cuit", cuit);
      formData.append("direccion", direccion);
      formData.append("telefono", telefono);
      formData.append("email", email);
      formData.append("password", password);

      if (imagenPerfil) {
        formData.append("imagenPerfil", imagenPerfil);
      }

      // Llamamos al método del contexto que hace la petición al backend
      const response = await registrarProductora(formData);

      if (response?.error) {
        setError(response.error);
      } else {
        navigate(PATHS.DASHBOARD);
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#05081b]">
      {/* Logo */}
      <div className="flex items-center gap-2 text-white font-bold text-xl mb-8">
        TICKEALO <img src="/tickealo.svg" alt="Logo Tickealo" className="w-6 h-6" />
      </div>

      {/* Card de registro */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-3xl border border-white/20">
        <h2 className="text-xl font-semibold text-center text-white mb-6">Registrarse</h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna 1 - Datos de la Productora */}
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Nombre de la Productora"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <Input
              placeholder="CUIT"
              type="text"
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
            />
            <Input
              placeholder="Dirección"
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
            <Input
              placeholder="Teléfono"
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />

            <label
              htmlFor="imagenPerfil"
              className="text-white font-medium mb-2"
            >
              Imagen de Perfil (opcional)
            </label>
            <input
              type="file"
              id="imagenPerfil"
              name="imagenPerfil"
              accept="image/*"
              onChange={(e) => setImagenPerfil(e.target.files[0])}
              className="px-4 py-2 rounded-lg bg-[#080C22] text-white placeholder-gray-300 focus:outline-none"
            />
          </div>

          {/* Columna 2 - Datos de Usuario */}
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Nombre de Usuario"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Botón y errores - ocupar ancho completo */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <Button text="Registrarse" />
            {error && (
              <p className="text-red-400 text-center font-medium">{error}</p>
            )}
          </div>
        </form>
      </div>

      <div className="gradient-triangle"></div>
    </div>
  );
}



