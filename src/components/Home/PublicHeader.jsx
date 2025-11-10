import { useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { useAuth } from "../../hooks/useAuth";
import { PATHS } from "../../routes/paths";
import Button from "../Button/Button";
import SecondaryButton from "../Button/SecondaryButton";

export function PublicHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => navigate(PATHS.LOGIN);
  const handleRegister = () => navigate(PATHS.REGISTER);
  const handleDashboard = () => navigate(PATHS.DASHBOARD);

  return (
    <header
      className="
        relative
        w-full 
        p-2
        flex 
        justify-center
        items-center
        bg-gradient-to-b
        from-[#0A0F2D]
        to-[#05081b]
        shadow-md
      "
    >
      {/* LOGO CENTRADO */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* BOTONES A LA DERECHA */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-4">
        {!user ? (
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
  );
}
