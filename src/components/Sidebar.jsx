import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PATHS } from "../routes/paths";
import {
  LogOut,
  CalendarMinus2,
  CreditCard,
  Users,
  PiggyBank,
  ChevronsRight,
  ChevronsLeft
} from "lucide-react";
import Logo from "./Logo";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const [hoverLogo, setHoverLogo] = useState(false);

  const items = [
    { key: "eventos", label: "Eventos", to: PATHS.DASHBOARD + "/eventos" },
    { key: "creditos", label: "Créditos", to: PATHS.DASHBOARD + "/creditos" },
    { key: "cobros", label: "Cobros", to: PATHS.DASHBOARD + "/cobros" },
    { key: "equipo", label: "Equipo", to: PATHS.DASHBOARD + "/equipo" },
  ];

  const isActive = (to) =>
    location.pathname === to || location.pathname.startsWith(to + "/");

  const renderIcon = (key) => {
    switch (key) {
      case "eventos": return CalendarMinus2;
      case "creditos": return CreditCard;
      case "cobros": return PiggyBank;
      case "equipo": return Users;
      default: return null;
    }
  };

  return (
    <aside
      className={`h-screen bg-[#05081b] backdrop-blur-sm border-r border-white/20 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
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
      <div
        className={`p-4 border-b border-white/20 flex items-center ${
          collapsed ? "justify-center" : "gap-3"
        }`}
      >
        {user?.imagenUrl ? (
          <img
            src={user?.imagenUrl}
            alt={user?.nombre || "Usuario"}
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            onClick={() => navigate(PATHS.DASHBOARD + "/perfil")}
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold cursor-pointer"
            onClick={() => navigate(PATHS.DASHBOARD + "/perfil")}
          >
            {user?.nombre?.[0]?.toUpperCase() || "U"}
          </div>
        )}

        {!collapsed && (
          <div className="cursor-pointer" onClick={() => navigate(PATHS.DASHBOARD + "/perfil")}>
            <h3 className="text-white font-semibold">{user?.nombre || "Usuario"}</h3>
            <button
              className="text-sm text-gray-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              Tu perfil
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="p-4 flex-1">
        <nav className="space-y-2">
          {items.map((it) => {
            const Icon = renderIcon(it.key);
            const active = isActive(it.to);

            return (
              <button
                key={it.key}
                onClick={() => navigate(it.to)}
                className={`w-full flex items-center relative cursor-pointer ${
                  collapsed ? "justify-center" : "gap-3 text-left"
                } px-4 py-2 transition-colors duration-200 ${
                  active && !collapsed ? "text-white" : "text-gray-300 hover:bg-white/10"
                }`}
                style={{
                  backgroundColor: active && !collapsed ? "rgba(255,255,255,0.1)" : "transparent",
                  borderTopRightRadius: collapsed ? 0 : "9999px",
                  borderBottomRightRadius: collapsed ? 0 : "9999px",
                }}
              >
                {active && (
                  <span
                    className="absolute left-0 top-0 h-full w-1 rounded-tr-full rounded-br-full"
                    style={{
                      background: "linear-gradient(to bottom, #03055F, #00B4D8, #90E0EF, #CAF0F8)",
                    }}
                  ></span>
                )}
                {Icon && <Icon className="h-5 w-5 z-10 flex-shrink-0" />}
                {!collapsed && it.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 mt-auto">
        <button
          onClick={() => {
            logout();
            navigate(PATHS.HOME || "/");
          }}
          className={`w-full flex items-center cursor-pointer ${
            collapsed ? "justify-center" : "gap-2"
          } px-4 py-2 text-white hover:bg-white/10 rounded-full transition-colors duration-200`}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && "Cerrar sesión"}
        </button>
      </div>
    </aside>
  );
}