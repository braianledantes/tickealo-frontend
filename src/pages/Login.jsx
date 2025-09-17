import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PATHS } from '../routes/paths';

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
    <div className="min-h-screen flex items-center justify-center bg-[#05081b]">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/5 text-white placeholder-gray-300 backdrop-blur-sm"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/5 text-white placeholder-gray-300 backdrop-blur-sm"
          />
          <button
            type="submit"
            className="text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #7226ff 0%, #160078 100%)' }}
          >
            Iniciar sesión
          </button>
          {error && <p className="text-red-400 text-center font-medium">{error}</p>}
        </form>
        <p className="text-center mt-6 text-gray-200">
          ¿No tienes cuenta?{' '}
          <span
            className="underline cursor-pointer hover:text-white font-semibold transition-colors duration-200 text-purple-300"
            onClick={() => navigate('/register')}
          >
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
}