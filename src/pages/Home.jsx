import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logotipo from "../assets/logotipo.png";
import { AuthContext } from "../context/AuthContext";
import { PATHS } from "../routes/paths";

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(PATHS.LOGIN);
  };

  const handleRegister = () => {
    navigate(PATHS.REGISTER);
  };

  const handleDashboard = () => {
    navigate(PATHS.DASHBOARD);
  };

  return (
    <div className="min-h-screen font-sans bg-[#05081b]">
      {/* Header */}
      <header className="w-full p-4 flex justify-end">
        <div className="flex gap-4">
          {!isAuthenticated ? (
            <>
              <button
                onClick={handleLogin}
                className="text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-blue-500/25"
                style={{ background: 'linear-gradient(135deg, #160078 0%, #00033d 100%)' }}
              >
                Iniciar Sesión
              </button>

              <button
                onClick={handleRegister}
                className="text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-purple-500/25"
                style={{ background: 'linear-gradient(135deg, #7226ff 0%, #160078 100%)' }}
              >
                Registrarse
              </button>
            </>
          ) : (
            <button
              onClick={handleDashboard}
              className="text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #7226ff 0%, #160078 100%)' }}
            >
              Ir al Dashboard
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8">
            <img
              src={logotipo}
              alt="Tickealo Logo"
              className="mx-auto h-32 w-auto object-contain"
            />
          </div>

          {/* Próximamente Text */}
          <h1 className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-white">
            Próximamente
          </h1>
        </div>
      </div>
    </div>
  );
}