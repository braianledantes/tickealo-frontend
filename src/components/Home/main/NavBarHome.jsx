import { useCallback, memo } from "react";
import { NavLink } from "react-router-dom";
import { PATHS } from "../../../routes/paths";
import { Menu, X } from "lucide-react";

const items = [
  { key: "iniciar sesion", label: "Iniciar Sesión", to: PATHS.LOGIN },
  { key: "registro", label: "Registrarse", to: PATHS.REGISTER },
];

function Navbar({ open, onClick }) {
  const handleNavClick = useCallback(() => {
    if (onClick) onClick();
  }, [onClick]);

  return (
    <>
      {open && (
        <div className="flex flex-col justify-between border-r border-white/20 bg-[#05081b] fixed left-0 w-64 h-screen mt-5">
          <div className="p-4 flex-1">
            <nav className="space-y-2">
              {items.map(({ key, label, to }) => (
                <NavLink
                  key={key}
                  to={to}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `w-full flex items-center relative gap-3 px-3 py-2 rounded-tr-full rounded-br-full transition-colors duration-200 ${
                      isActive
                        ? "text-white bg-white/10"
                        : "text-gray-300 hover:bg-white/10"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-0 h-full w-1 rounded-tr-full rounded-br-full bg-gradient-to-b from-[#03055F] via-[#00B4D8] via-[#90E0EF] to-[#CAF0F8]" />
                      )}
                      {!isActive && (
                        <span className="absolute left-0 top-0 h-full w-1 rounded-tr-full rounded-br-full bg-gradient-to-b from-[#03055F] via-[#00B4D8] via-[#90E0EF] to-[#CAF0F8] opacity-0 group-hover:opacity-30 transition-opacity duration-200" />
                      )}
                      {label}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Navbar);