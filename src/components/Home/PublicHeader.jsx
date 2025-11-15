import { useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { useAuth } from "../../hooks/useAuth";
import { PATHS } from "../../routes/paths";
import Button from "../Button/Button";
import SecondaryButton from "../Button/SecondaryButton";
import Navbar from "./main/NavBarHome";
import { X , Menu} from "lucide-react";
import { useState } from "react";

export function PublicHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();
    const [open, setOpen] = useState(false);

  const handleLogin = () => navigate(PATHS.LOGIN);
  const handleRegister = () => navigate(PATHS.REGISTER);
  const handleDashboard = () => navigate(PATHS.DASHBOARD);

  return (
    <header className="w-full bg-gradient-to-b from-[#0A0F2D] to-[#05081b] shadow-md fixed md:relative z-50">
  <div className="flex items-center justify-between p-2 md:px-6 md:py-3 relative">
    {/* Logo centrado en móviles y a la izquierda en md+ */}
    <div className="flex-1 flex justify-center items-center">
      <Logo />
    </div>

    {/* Botones para pantallas md+ */}
    <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 gap-4">
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
            background: "linear-gradient(135deg, #7226ff 0%, #160078 100%)",
          }}
        >
          Ir al Dashboard
        </button>
      )}
    </div>

    {/* Botón hamburguesa para móviles */}
    <div className="absolute left-4 md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-white focus:outline-none"
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>
      <Navbar open={open} onClick={() => setOpen(false)} />
    </div>
  </div>
</header>

  );
}
