import BankCard from "../components/BankCard";
import Button from "../components/Button/Button";
import SecondaryButton from "../components/Button/SecondaryButton";
import LoadingSpinner from "../components/LoadingSpinner";
import InputTextArea from "../components/Input/InputTextArea";
import { validarCuentaBancaria } from "../utils/validacionesCuentaBancaria";
import { useState, useEffect } from "react";
import {useCuentaBancaria} from "../hooks/useCuentaBancaria"
import DeleteButton from "../components/Button/DeleteButton";

export default function Cobros() {
  const { 
    cuentaBancaria, 
    getCuentasBancarias, 
    crearCuentaBancaria, 
    actualizarCuentaBancaria, 
    eliminarCuentaBancaria
  } = useCuentaBancaria()

  const [instrucciones, setInstrucciones] = useState("");
  const [loading, setLoading] = useState(true);
  const [cuentaTemp, setCuentaTemp] = useState({});
  const [errores, setErrores] = useState({});

  // Cargar cuenta bancaria al montar
  useEffect(() => {
    const fetchCuenta = async () => {
      setLoading(true);
      try {
        const data = await getCuentasBancarias();
        if (data) {
          setCuentaTemp(data); // cuentaTemp para editar porque si no no me deja
          setInstrucciones(data.instrucciones || "");
        }
      } catch (err) {
        console.error("Error cargando cuenta bancaria:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCuenta();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevosErrores = validarCuentaBancaria({ ...cuentaTemp, instrucciones });
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    try {
      if (!cuentaBancaria) {
        // Crear nueva cuenta
        await crearCuentaBancaria({ ...cuentaTemp, instrucciones });
      } else {
        // Actualizar cuenta existente
        const { id, createdAt, updatedAt, ...payload } = { ...cuentaTemp, instrucciones };
        await actualizarCuentaBancaria(payload);
      }
    } catch (err) {
      console.error("Error guardando cuenta bancaria:", err.response?.data || err.message);
    }
  };

  if (loading) return <LoadingSpinner />

  return (
    <div className="bg-[#05081b]/40 rounded-2xl shadow-2xl p-8 border border-white/20 mb-20 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">Método de cobro</h2>
      
      <p className="text-gray-200 mb-8">
        Antes de crear tus eventos, necesitamos que vincules tu cuenta bancaria. 
        Esto nos permite gestionar los pagos de manera segura y rápida.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <BankCard 
            label="Cuenta bancaria vinculada"
            cuenta={cuentaTemp} 
            onChange={setCuentaTemp} 
            edit={true} 
            errores={errores}
          />
        </div>

        <div className="-mt-2">
          <InputTextArea
            label={<>Notas sobre el cobro <span className="text-gray-400">(opcional)</span></>}
            placeholder="Escribe aquí cualquier detalle o instrucción especial sobre los pagos de tus eventos..."
            value={instrucciones}
            onChange={(e) => setInstrucciones(e.target.value)}
            maxLength={255}
          />

          {/* Mostrar errores de BankCard */}
          {Object.keys(errores).length > 0 && (
            <div className="mt-2 space-y-2">
              {Object.entries(errores).map(([campo, mensaje]) =>
                campo !== "instrucciones" ? (
                  <p key={campo} className="text-red-500 text-sm">{mensaje}</p>
                ) : null
              )}
            </div>
          )}
        </div>
      </form>
      
      <div className="mt-6 flex flex-col md:flex-row justify-center md:justify-end gap-8">
        { cuentaBancaria ? (
          <SecondaryButton
            type="submit"
            text="Actualizar datos"
            onClick={handleSubmit}
            className="w-full md:w-auto"
          />
        ): (
          <Button
            type="submit"
            text="Guardar"
            onClick={handleSubmit}
            className="w-full md:w-auto"
          />
        )}
        {cuentaBancaria && (
          <DeleteButton
            text="Eliminar"
            onClick={async () => {
              if (confirm("¿Seguro que quieres eliminar la cuenta bancaria?")) {
                try {
                  await eliminarCuentaBancaria();
                  setCuentaTemp({});
                  setInstrucciones("");
                } catch (err) {
                  console.error(err);
                }
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
