import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCountry } from '../../hooks/useCountry';
import { validarProductora } from '../../utils/validarProductora';
import Button from '../Button/Button';
import ProfilePictureUploader from '../Images/ProfilePictureUploader';
import Input from '../Input/Input';
import Dropdown from '../Button/Dropdown';
import InputNumber from '../Input/InputNumber';

export function RegisterForm() {
  const { registrarProductora } = useAuth();
  const { countries, getCountryDetails } = useCountry();
    const [loading, setLoading] = useState(false);

  const [nombre, setNombre] = useState('');
  const [cuit, setCuit] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pais, setPais] = useState('');
  const [prefix, setPrefix] = useState('');
  const [imagenPerfil, setImagenPerfil] = useState(null);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const countryOptions = countries.map(c => ({
    label: c.name,  // lo que se muestra
    value: c.name,  // lo que se envía al backend
    iso: c.isoCode  // solo para cálculo del prefijo
  }));

  const handleCountryChange = async (selectedName) => {
    setPais(selectedName);
    setError('');
    setTouched(false);
    try {
      const country = countryOptions.find(c => c.label === selectedName);
      if (country?.iso) {
        const details = await getCountryDetails(country.iso);
        setPrefix(details?.sPhoneCode || '');
      } else {
        setPrefix('');
      }
    } catch (err) {
      console.error('Error obteniendo prefijo del país:', err);
      setPrefix('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    setLoading(true);

    const errores = validarProductora({ nombre, cuit, direccion, telefono, username, email, password });
    if (!pais) errores.pais = 'Seleccioná un país';

    if (Object.keys(errores).length > 0) {
      setError(Object.values(errores).join(' - '));
      setLoading(false);
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
      formData.append("pais", pais);
      if (imagenPerfil) formData.append("imagenPerfil", imagenPerfil);

      const response = await registrarProductora(formData);

      if (response?.error) {
        setError(response.error);
      } else {
        setNombre('');
        setCuit('');
        setTelefono('');
        setDireccion('');
        setUsername('');
        setEmail('');
        setPassword('');
        setPais('');
        setPrefix('');
        setImagenPerfil(null);
        setError('');
        setTouched(false);
      }
      setLoading(false);
    } catch (err) {
      setError("Error al registrar. Intenta nuevamente.\n" + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='p-6'>
      <div className="w-70 mx-auto mb-6">
        <ProfilePictureUploader label="Imagen de Perfil (opcional)" onFileSelect={setImagenPerfil} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className="flex flex-col gap-4">
          <h1 className="text-gray-300 px-2">Datos de la Productora</h1>
          <Input
            placeholder="Nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            error={!nombre}
            showError={touched}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dropdown
              options={countryOptions}
              value={pais}
              onChange={handleCountryChange}
              placeholder="Nacionalidad"
              error={touched && !pais ? "" : ""}
              showError={touched}
            />
            <InputNumber
              placeholder="Teléfono"
              value={telefono}
              onChangeValue={setTelefono}
              prefix={prefix || "54"}
              showAlertPrefix={false}
              error={!telefono}
              showError={touched}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Dirección"
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              error={!direccion}
              showError={touched}
            />
            <Input
              placeholder="CUIT"
              type="text"
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
              error={!cuit}
              showError={touched}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-gray-300 px-2">Datos del Dueño</h1>
          <Input
            placeholder="Nombre de Usuario"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!username}
            showError={touched}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!email}
            showError={touched}
          />
          <Input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!password}
            showError={touched}
          />
        </div>

        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
          <Button type='submit'>{loading ? '...Registrando' : 'Registrarse'}</Button>
          {error && <p className="text-red-400 text-center font-medium">{error}</p>}
        </div>
      </div>
    </form>
  );
}
