import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PATHS } from "../routes/paths";
import { LogOut, CalendarMinus2, CreditCard, Users, UserSquare } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);

  const items = [
    { key: "dashboard", label: "Dashboard", to: PATHS?.DASHBOARD || "/dashboard" },
    { key: "eventos", label: "Eventos", to: PATHS?.EVENTOS || "/eventos/eventos" },
    { key: "creditos", label: "Creditos", to: PATHS?.PROFILE || "/creditos" },
    { key: "equipo", label: "Equipo", to: PATHS?.SETTINGS || "/equipo" },
  ];

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + "/");

  const renderIcon = (key) => {
    switch (key) {
      case "dashboard":
        return UserSquare;
      case "eventos":
        return CalendarMinus2;
      case "creditos":
        return CreditCard;
      case "equipo":
        return Users;
      default:
        return null;
    }
  };

  return (
    <aside className="w-64 bg-white/10 backdrop-blur-sm border-r border-white/20 flex flex-col">
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
            {user?.nombre?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h3 className="text-white font-semibold">{user?.nombre || "Usuario"}</h3>
            <button
              className="text-sm text-gray-300 hover:text-white flex items-center gap-1"
              onClick={() => navigate(PATHS?.PROFILE || "/perfil")}
            >
              Tu perfil
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <nav className="space-y-2">
          {items.map((it) => {
            const Icon = renderIcon(it.key);
            return (
              <button
                key={it.key}
                onClick={() => navigate(it.to)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive(it.to) ? "bg-white/20 text-white" : "text-gray-300 hover:bg-white/10"
                }`}
              >
                {Icon && <Icon className="h-5 w-5 inline-block mr-3 align-middle" />}
                {it.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/20 mt-auto">
        <button
          onClick={() => { logout(); navigate(PATHS?.HOME || "/"); }}
          className="w-full flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
        >
          <LogOut className="h-5 w-5" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}