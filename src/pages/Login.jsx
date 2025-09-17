import { useState } from 'react';
import { login } from "../api/auth"; // tu archivo donde definiste login
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      localStorage.setItem('token', data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 placeholder-blue-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 placeholder-blue-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-700 to-blue-400 text-white font-semibold py-2 rounded-lg shadow-md hover:from-blue-800 hover:to-blue-500 transition-colors"
          >
            Iniciar sesión
          </button>
          {error && <p className="text-red-600 text-center">{error}</p>}
        </form>
        <p className="text-center mt-4 text-blue-700">
          ¿No tienes cuenta?{' '}
          <span
            className="underline cursor-pointer hover:text-blue-900 font-semibold"
            onClick={() => navigate('/register')}
          >
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
}