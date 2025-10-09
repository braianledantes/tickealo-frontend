import { useNavigate } from "react-router-dom";
import logotipo from "../assets/logotipo.png";
import { useAuth } from "../../hooks/useAuth";
import { PATHS } from "../../routes/paths";
import Button from "../Button/Button";
import SecondaryButton from "../Button/SecondaryButton";

export function PublicHeader() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => navigate(PATHS.LOGIN);
  const handleRegister = () => navigate(PATHS.REGISTER);
  const handleDashboard = () => navigate(PATHS.DASHBOARD);
  const handleHome = () => navigate(PATHS.HOME);

  return (
    <header className="w-full p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={logotipo}
          alt="Tickealo Logo"
          className="h-10 w-auto object-contain cursor-pointer"
          onClick={handleHome}
        />
      </div>

      <div className="flex gap-4">
        {!isAuthenticated ? (
          <>
            <Button onClick={handleLogin}>Iniciar Sesión</Button>
            <SecondaryButton text="Registrarse" onClick={handleRegister} />
          </>
        ) : (
          <button
            onClick={handleDashboard}
            className="text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, #7226ff 0%, #160078 100%)",
            }}
          >
            Ir al Dashboard
          </button>
        )}
      </div>
    </header>
  )
}