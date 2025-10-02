import { AtSign, KeyRound } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/Button/Button';
import ButtonLink from '../components/Button/ButtonLink';
import Input from '../components/Input/Input';
import Logo from '../components/Logo';
import useAuth from "../../hooks/useAuth";
import { PATHS } from '../routes/paths';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }
    setError('');

    const res = await login({ email, password });
    if (res.error) {
      setError('Credenciales inválidas, intenta nuevamente.');
    } else {
      setError('');
      // Redirigir o actualizar la UI según sea necesario
    }
  };

  console.log("URL login:", import.meta.env.VITE_API_URL + '/api/auth/login-productora');


  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center bg-[#05081b]">

      <div className="absolute top-10"><Logo /></div>

      {/* Contenedor del formulario */}
      <div className="w-full max-w-md px-6">
        <h2 className="text-2xl font-regular-base text-center text-white/90 mb-4">Bienvenido!</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input icon={<AtSign />} placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input icon={<KeyRound />} placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button text="Iniciar sesión"/>
          {error && <p className="text-red-400 text-center font-base-regular">{error}</p>}
        </form>

        <p className="text-center mt-6 text-gray-200">
          ¿No tienes una cuenta?{' '}
          <ButtonLink  to={PATHS.REGISTER} text="Regístrate aquí"/>
        </p>
      </div>
    </div>
  );
}
