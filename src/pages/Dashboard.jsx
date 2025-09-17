import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Bienvenido al Dashboard</h2>
        <button
          onClick={handleLogout}
          className="mt-4 bg-gradient-to-r from-blue-700 to-blue-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-blue-800 hover:to-blue-500 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
