import {
  CalendarMinus2,
  ChevronsLeft,
  ChevronsRight,
  CreditCard,
  LogOut,
  PiggyBank,
  Tickets,
  Users
} from "lucide-react";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PATHS } from "../routes/paths";
import Avatar from "./Avatar";
import Logo from "./Logo";

export default function Sidebar() {
  const { logout, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const navigateToPerfil = () => {
    navigate(PATHS.PERFIL);
  }

  const [collapsed, setCollapsed] = useState(false);
  const [hoverLogo, setHoverLogo] = useState(false);

  const items = [
    { key: "eventos", label: "Eventos", to: PATHS.EVENTOS },
    { key: "creditos", label: "Créditos", to: PATHS.CREDITOS },
    { key: "cobros", label: "Cobros", to: PATHS.COBROS },
    { key: "equipo", label: "Equipo", to: PATHS.EQUIPO },
    { key: "entradas", label: "Entradas", to: PATHS.ENTRADAS },
  ];

  const renderIcon = (key) => {
    switch (key) {
      case "eventos":
        return CalendarMinus2;
      case "creditos":
        return CreditCard;
      case "cobros":
        return PiggyBank;
      case "equipo":
        return Users;
      case "entradas":
        return Tickets;
      default:
        return null;
    }
  };

  return (
    <aside
      className={`h-screen bg-[#05081b] backdrop-blur-sm border-r border-white/20 flex flex-col justify-between transition-all duration-300 ${collapsed ? "w-20" : "w-64"
        }`}
    >
      {/* Logo */}
      <div
        className="flex items-center justify-center p-3 relative"
        onMouseEnter={() => setHoverLogo(true)}
        onMouseLeave={() => setHoverLogo(false)}
      >
        {/* Logo visible cuando no hay hover */}
        {collapsed && !hoverLogo && (
          <img
            src="/tickealo.svg"
            alt="Tickealo"
            className="w-9 h-9 transition-opacity duration-200 cursor-pointer"
            onClick={() => setCollapsed(false)}
          />
        )}

        {collapsed && hoverLogo && (
          <button
            onClick={() => setCollapsed(false)}
            className="cursor-pointer text-white bg-[#FFFFFF1A] w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
          >
            <ChevronsRight className="w-5 h-5" />
          </button>
        )}

        {!collapsed && (
          <div className="relative flex items-center">
            <Logo className="cursor-pointer" />

            <button
              onClick={() => setCollapsed(true)}
              className="absolute -right-13 cursor-pointer text-white bg-[#191D31] shadow-lg hover:bg-[#03045E] w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
            >
              <ChevronsLeft className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Usuario */}
      <div className={`p-4 border-b border-white/20 flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
        <Avatar src={user?.imagenUrl} name={user.user.username} onClick={navigateToPerfil} />
        {
          collapsed ||
          <div>
            <h2 className="text-white font-semibold">
              {user.nombre}
            </h2>
            <p className="text-gray-400 text-sm">{user.user.email}</p>
          </div>
        }
      </div>


      {/* Navigation */}
      <div className="p-4 flex-1">
        <nav className="space-y-2">
          {items.map((it) => {
            const Icon = renderIcon(it.key);

            return (
              <NavLink
                to={it.to}
                key={it.key}
                className={({ isActive }) =>
                  `w-full flex items-center relative px-4 py-2 transition-colors duration-200 ${collapsed ? "justify-center" : "gap-3 text-left"
                  } ${isActive && !collapsed
                    ? "text-white bg-white/10 rounded-r-full"
                    : "text-gray-300 hover:bg-white/10"
                  } ${!collapsed ? "rounded-r-full" : ""
                  } group` // Necesario para hover interno
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Indicador lateral degradado activo */}
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-1 rounded-tr-full rounded-br-full bg-gradient-to-b from-[#03055F] via-[#00B4D8] via-[#90E0EF] to-[#CAF0F8]"></span>
                    )}

                    {/* Indicador lateral degradado solo en hover */}
                    {!collapsed && !isActive && (
                      <span className="absolute left-0 top-0 h-full w-1 rounded-tr-full rounded-br-full bg-gradient-to-b from-[#03055F] via-[#00B4D8] via-[#90E0EF] to-[#CAF0F8] opacity-0 group-hover:opacity-30 transition-opacity duration-200"></span>
                    )}

                    {Icon && <Icon className="h-5 w-5 z-10 flex-shrink-0" />}
                    {!collapsed && it.label}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 mt-auto">
        <button
          onClick={() => {
            logout();
          }}
          className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-2"
            } px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200`}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && "Cerrar sesión"}
        </button>
      </div>
    </aside>
  );
}