import { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [selectedOption] = useState("dashboard");

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #010030 0%, #00033d 50%, #160078 100%)' }}>
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6">Bienvenido{user?.nombre ? `, ${user.nombre}` : ''}</h2>
          <p className="text-gray-200">¡Has iniciado sesión correctamente!</p>
        </div>
      </main>
    </div>
  );
}
