import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PATHS } from "../routes/paths";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate(PATHS.HOME);
  };
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #010030 0%, #00033d 50%, #160078 100%)' }}>
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md text-center border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-6">Bienvenido al Dashboard</h2>
        <p className="text-gray-200 mb-8">¡Has iniciado sesión correctamente!</p>
        <button
          onClick={handleLogout}
          className="text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #160078 0%, #00033d 100%)' }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
