import { useEffect, useState } from "react";
import Input from "../Input/Input";
import ClienteList from "../Miembros/ClienteList";
import { buscarClientePorEmail } from "../../api/clientes";

export default function MiembroBuscar({ onAgregar }) {
  const [email, setEmail] = useState("");
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!email.trim()) {
      setCliente([]);
      setError("");
      return;
    }

    setTyping(true);

    const delay = setTimeout(async () => {
      setTyping(false);

      const results = await buscarClientePorEmail(email.trim());

      setCliente(results);

      if (results.length === 0) {
        setError("No existe un usuario con ese correo.");
      } else {
        setError("");
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [email]);

  return (
    <div className="space-y-4 mb-10">
      <Input
        placeholder="Correo del usuario..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {typing && email.trim() !== "" && (
        <p className="text-gray-400 text-sm">Buscando...</p>
      )}

      {/*error si no existe usuario */}
      {error && !typing && <p className="text-red-500 text-sm">{error}</p>}

      {!typing && Array.isArray(cliente) && cliente.length === 1 && (
        <div className="mt-4">
          <p className="text-[#cfe3ff] tracking-wider font-semibold mb-2">
            USUARIO ENCONTRADO
          </p>

          <ClienteList
            cliente={cliente[0]}
            onSelect={() => onAgregar(cliente[0].user.email)}
          />
        </div>
      )}
    </div>
  );
}
