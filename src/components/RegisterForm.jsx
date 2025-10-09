import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { validarProductora } from '../utils/validarProductora';
import Button from './Button/Button';
import ProfilePictureUploader from './Images/ProfilePictureUploader';
import Input from './Input/Input';

export function RegisterForm() {
  const { registrarProductora } = useAuth();

  const [nombre, setNombre] = useState('')
  const [cuit, setCuit] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)
  const [imagenPerfil, setImagenPerfil] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched(true)

    // Validación antes de enviar
    const errores = validarProductora({ nombre, cuit, direccion, telefono, username, email, password });
    if (Object.keys(errores).length > 0) {
      setError(Object.values(errores).join(" - "));
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

      // Resetear el formulario después del envío
      setNombre('')
      setCuit('')
      setTelefono('')
      setDireccion('')
      setUsername('')
      setEmail('')
      setPassword('')
      setError('')
      setTouched(false)
      setImagenPerfil(null);
    } catch (error) {
      setError("Error al registrar. Intenta nuevamente.\n" + error.response?.data?.message || error.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='p-6 '>
        <div className="w-70 mx-auto mb-6">
          <ProfilePictureUploader label="Imagen de Perfil (opcional)" onFileSelect={(file) => setImagenPerfil(file)} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className="flex flex-col gap-4">
            <h1 className="text-gray-300 px-2">Datos de la Productora</h1>
            <Input placeholder="Nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} error={!nombre} showError={touched} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="CUIT" type="text" value={cuit} onChange={(e) => setCuit(e.target.value)} error={!cuit} showError={touched} />
              <Input placeholder="Teléfono" type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} error={!telefono} showError={touched} />
            </div>
            <Input placeholder="Dirección" type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} error={!direccion} showError={touched} />
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-gray-300 px-2">Datos del Dueño</h1>
            <Input placeholder="Nombre de Usuario" type="text" value={username} onChange={(e) => setUsername(e.target.value)} error={!username} showError={touched} />
            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={!email} showError={touched} />
            <Input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={!password} showError={touched} />
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <Button text="Registrarse" />
            {error && <p className="text-red-400 text-center font-medium">{error}</p>}
          </div>
        </div>
      </form>
    </>
  )
}