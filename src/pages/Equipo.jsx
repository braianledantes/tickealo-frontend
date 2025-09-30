import { useState, useContext, useEffect } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { AtSign, Trash2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Equipo() {
  const { agregarMiembroEquipo, eliminarMiembroEquipo, getMiembrosEquipo } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar miembros al montar
  useEffect(() => {
    const fetchMiembros = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getMiembrosEquipo();
        setMiembros(data);
      } catch (err) {
        setError("Error cargando miembros del equipo");
      } finally {
        setLoading(false);
      }
    };
    fetchMiembros();
  }, []);

  const handleAgregar = async () => {
    if (!email) return;
      // Validación simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Ingresa un correo válido.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await agregarMiembroEquipo(email);
      if (res.error) {
        setError(res.error);
      } else {
        setMiembros([...miembros, res]);
        setEmail("");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (userEmail) => {
    setLoading(true);
    setError("");
    try {
      const res = await eliminarMiembroEquipo(userEmail);
      if (res.error) {
        setError(res.error);
      } else {
        setMiembros(miembros.filter((m) => m.user.email !== userEmail));
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#05081b]/40 rounded-2xl shadow-2xl p-8 border border-white/20 mb-20 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-4">Equipo</h2>

      <div className="border-b border-white/20 mb-6 pb-4 space-y-5">
        <p className="text-white font-light pt-3">
          Ingresa el mail exacto del usuario a quien quieras que sea Validador/a.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <Input
              icon={<AtSign />}
              placeholder="Correo del usuario..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Button text="Agregar Validador" onClick={handleAgregar} disabled={loading} />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <p className="flex justify-center text-[#A5A6AD] text-sm font-light">
          Recordá: El usuario debe estar registrado en la plataforma!
        </p>
      </div>

      {/* Lista de miembros */}
      {miembros.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-[#A5A6AD] font-bold mb-2 tracking-wide">MIEMBROS ACTUALES</h3>
          <ul>
            {miembros.map((m, i) => {
              const miembro = m.user || m.cliente || {};
              const imagen = miembro.imagenUrl || miembro.imagenPerfilUrl;
              const nombre = miembro.nombre || miembro.username || "Usuario";
              const email = miembro.email || (miembro.user && miembro.user.email) || "";

              return (
                <li key={i} className="flex justify-between items-center p-3">
                  <div className="flex items-center gap-3">
                    {imagen ? (
                      <img src={imagen} alt={nombre} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                        {nombre?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                    <div>
                      <p className="text-white text-xl font-semibold">{nombre}</p>
                      <p className="text-gray-400 text-sm">{email}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleEliminar(email)}
                    className="text-red-400 hover:text-red-600"
                    disabled={loading}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              );
            })}
          </ul>

        </div>
      )}
    </div>
  );
}
