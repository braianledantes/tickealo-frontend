import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PATHS } from '../routes/paths';
import { AtSign , KeyRound } from 'lucide-react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import ButtonLink from '../components/ButtonLink/ButtonLink';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, login: contextLogin } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATHS.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contextLogin({ email, password });
      navigate(PATHS.DASHBOARD);
    } catch {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center bg-[#05081b]">

      {/* Gradient */}
      <div className="gradient-triangle absolute -top-30 w-full z-0"></div>

      {/* Logo TICKEALO */}
      <div className="flex items-center gap-2 text-white font-bold text-2xl absolute top-20 z-20">
        TICKEALO <img src="/tickealo.svg" alt="Logo Tickealo" className="w-7 h-7" />
      </div>

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
