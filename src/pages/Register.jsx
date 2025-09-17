import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { PATHS } from "../routes/paths";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AppContext);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATHS.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    
    // Validación básica
    if (!email || !password) {
      setError("Por favor, completa todos los campos");
      return;
    }
    
    // Aquí deberías llamar a tu API de registro
    // Simulación de registro exitoso:
    localStorage.setItem("token", "demo_token");
    navigate(PATHS.DASHBOARD);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #010030 0%, #00033d 50%, #160078 100%)'}}>
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Registrarse</h2>
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
            style={{background: 'linear-gradient(135deg, #7226ff 0%, #160078 100%)'}}
          >
            Registrarse
          </button>
          {error && <p className="text-red-400 text-center font-medium">{error}</p>}
        </form>
      </div>
    </div>
  );
}
