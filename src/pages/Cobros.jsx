import Sidebar from "../components/Sidebar";
import BankCard from "../components/BankCard";
import Button from "../components/Button/Button";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Creditos() {
  const { crearCuentaBancaria, getCuentasBancarias } = useContext(AuthContext);

  const [cuenta, setCuenta] = useState(null);
  const [instrucciones, setInstrucciones] = useState("");

  // Traer la cuenta existente al cargar la página
  useEffect(() => {
    const fetchCuenta = async () => {
      try {
        const data = await getCuentasBancarias(); 
        if (data) {
          setCuenta(data);
          setInstrucciones(data.instrucciones || "");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCuenta();
  }, []);

  const handleCuentaChange = (updatedCuenta) => {
    setCuenta(updatedCuenta);
  };

  const handleInstruccionesChange = (e) => {
    setInstrucciones(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cuenta) return;

    try {
      const nuevaCuenta = await crearCuentaBancaria({
        ...cuenta,
        instrucciones,
      });
      setCuenta(nuevaCuenta);
      alert("Cuenta bancaria guardada correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al guardar la cuenta bancaria");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#010030] via-[#00033d] to-[#160078]">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Metodo de cobro</h2>
          
          <p className="text-gray-200 mb-6">
            Edita los datos de tu cuenta bancaria directamente en la tarjeta.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* BankCard editable */}
            <BankCard cuenta={cuenta} onChange={handleCuentaChange} edit={true} />

            {/* Instrucciones separadas */}
            <div className="mt-4">
              <label className="text-white font-semibold mb-1 block" htmlFor="instrucciones">
                Instrucciones
              </label>
              <textarea
                id="instrucciones"
                value={instrucciones}
                onChange={handleInstruccionesChange}
                placeholder="Agrega instrucciones especiales para esta cuenta..."
                className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white/50 outline-none resize-none"
                rows={4}
              />
            </div>

            <Button type="submit" text="Guardar" />
          </form>
        </div>
      </main>
    </div>
  );
}
