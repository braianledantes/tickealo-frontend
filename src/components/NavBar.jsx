import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PATHS } from "../routes/paths";
import {
  LogOut,
  CalendarMinus2,
  CreditCard,
  Users,
  PiggyBank,
  Tickets,
  Menu,
  X,
} from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const items = [
    { key: "eventos", label: "Eventos", to: PATHS.EVENTOS, icon: CalendarMinus2 },
    { key: "creditos", label: "Créditos", to: PATHS.CREDITOS, icon: CreditCard },
    { key: "cobros", label: "Cobros", to: PATHS.COBROS, icon: PiggyBank },
    { key: "equipo", label: "Equipo", to: PATHS.EQUIPO, icon: Users },
    { key: "entradas", label: "Entradas", to: PATHS.ENTRADAS, icon: Tickets },
  ];

    // const handleClose = () => {
    // if (!open) {
    //     setOpen(true);
    //     setClosing(false); 
    // } else {
    //     setClosing(true); 
    //     setTimeout(() => {
    //     setOpen(false);
    //     }, 300); 
    // }
    // };

  return (
    <nav className="fixed top-0 left-0 w-full h-18 bg-[#05081b] border-b border-white/20 z-50 md:hidden">
      {/* Header con logo y botón menú */}
      <div className="grid grid-cols-3 px-4 py-1">
        <button
          onClick={() => setOpen(!open)}
          className="text-white focus:outline-none"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
        <Logo/>
        <div></div>
      </div>


      {/* Menú desplegable */}
      {open && (
        <div className={`flex flex-col justify-between  border-r border-white/20 bg-[#05081b] w-64 h-screen `}>
            <div className="p-4 flex items-center border-b border-white/20 gap-3">
                {user?.imagenUrl ? (
                    <img
                        src={user?.imagenUrl}
                        alt={user?.nombre || "Usuario"}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                        {user?.nombre?.[0]?.toUpperCase() || "U"}
                    </div>
                )}
                <div>
                    <h2 className="text-white font-semibold">
                        {user?.nombre || "Usuario"}
                    </h2>
                    <NavLink
                        to={PATHS.DASHBOARD + "/perfil"}
                        className="text-sm text-gray-300 hover:text-white flex items-center gap-1"
                    >
                        Tu perfil
                    </NavLink>
                </div>
            </div>
        
            <div className="p-4 flex-1">
                <nav className="space-y-2">
                    {items.map(({ key, label, to, icon: Icon }) => (
                        <NavLink
                        key={key}
                        to={to}
                        onClick={() => setOpen(false)}
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
                            {/* Indicador lateral degradado activo */}
                            {isActive && (
                                <span className="absolute left-0 top-0 h-full w-1 rounded-tr-full rounded-br-full bg-gradient-to-b from-[#03055F] via-[#00B4D8] via-[#90E0EF] to-[#CAF0F8]"></span>
                            )}

                            {/* Indicador lateral degradado solo en hover */}
                            {!isActive && (
                                <span className="absolute left-0 top-0 h-full w-1 rounded-tr-full rounded-br-full bg-gradient-to-b from-[#03055F] via-[#00B4D8] via-[#90E0EF] to-[#CAF0F8] opacity-0 group-hover:opacity-30 transition-opacity duration-200"></span>
                            )}

                            {Icon && <Icon className="h-5 w-5 z-10 flex-shrink-0" />}
                            {label}
                            </>
                        )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Logout */}
            <div className="p-4 mt-auto">
                <button
                onClick={() => {
                    logout();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
                >
                <LogOut className="h-5 w-5" />
                {"Cerrar sesión"}
                </button>
            </div>
        </div>
       )} 
    </nav>
  );
}