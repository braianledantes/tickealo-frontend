import BankCard from "../components/BankCard";
import Button from "../components/Button/Button";
import SecondaryButton from "../components/Button/SecondaryButton";
import LoadingSpinner from "../components/LoadingSpinner";
import InputTextArea from "../components/InputTextArea";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Cobros() {
  const { 
    cuentaBancaria, 
    getCuentaBancarias, 
    crearCuentaBancaria, 
    eliminarCuentaBancaria
  } = useContext(AuthContext);

  const [instrucciones, setInstrucciones] = useState("");
  const [loading, setLoading] = useState(true);
  const [cuentaTemp, setCuentaTemp] = useState({});
  const [errores, setErrores] = useState({});

  // Cargar cuenta bancaria al montar
  useEffect(() => {
    const fetchCuenta = async () => {
      setLoading(true);
      try {
        const data = await getCuentaBancarias();
        if (data) setInstrucciones(data.instrucciones || "");
      } catch (err) {
        console.error("Error cargando cuenta bancaria:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCuenta();
  }, []);

  const validarCampos = () => {
    const nuevosErrores = {};
    if (!cuentaTemp.nombreTitular) nuevosErrores.nombreTitular = "El nombre del titular es obligatorio.";
    if (!cuentaTemp.cbu || cuentaTemp.cbu.length !== 22) nuevosErrores.cbu = "El CBU debe tener 22 dígitos.";
    if (!cuentaTemp.alias) nuevosErrores.alias = "El alias es obligatorio.";
    if (!cuentaTemp.nombreBanco) nuevosErrores.nombreBanco = "Debe seleccionar un banco.";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCampos()) return;

    try {
      if (!cuentaBancaria) {
        await crearCuentaBancaria({ ...cuentaTemp, instrucciones });
        alert("Cuenta bancaria creada correctamente");
      } else {
        alert("No se puede actualizar la cuenta bancaria, solo crear o eliminar");
      }
    } catch (err) {
      console.error("Error creando cuenta bancaria:", err.response?.data || err.message);
      alert("Error al guardar la cuenta bancaria");
    }
  };

  if (loading) 
    return (
      <main className="flex-1 p-6 h-screen overflow-y-auto scrollbar-none">
        <LoadingSpinner />
      </main>
    );

  return (
    <div className="bg-[#05081b]/40 rounded-2xl shadow-2xl p-8 border border-white/20 mb-20 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">Método de cobro</h2>
      
      <p className="text-gray-200 mb-6">
        Aquí puedes agregar los datos de tu cuenta bancaria y notas sobre los pagos de tus eventos.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <BankCard 
            cuenta={cuentaBancaria || cuentaTemp} 
            onChange={setCuentaTemp} 
            edit={true} 
            errores={errores}
          />
        </div>

        <div className="pt-3">
          <InputTextArea
            label="Notas sobre el cobro"
            placeholder="Escribe aquí cualquier detalle o instrucción especial sobre los pagos de tus eventos..."
            value={instrucciones}
            onChange={(e) => setInstrucciones(e.target.value)}
            maxLength={300}
          />
        </div>
      </form>

      <div className="mt-6 flex flex-col md:flex-row justify-center md:justify-end gap-4">
        {cuentaBancaria ? (
          <>
            <Button type="submit" text="Guardar" onClick={handleSubmit} />
            <SecondaryButton
              text="Eliminar"
              onClick={async () => {
                if (confirm("¿Seguro que quieres eliminar la cuenta bancaria?")) {
                  try {
                    await eliminarCuentaBancaria();
                    alert("Cuenta bancaria eliminada correctamente");
                  } catch (err) {
                    console.error(err);
                    alert("Error al eliminar la cuenta bancaria");
                  }
                }
              }}
            />
          </>
        ) : (
          <Button type="submit" text="Guardar" onClick={handleSubmit} className="w-full" />
        )}
      </div>
    </div>
  );
}
