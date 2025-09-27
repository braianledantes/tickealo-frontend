import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import PrimerPaso from "../../components/Pasos/PrimerPaso";
import SegundoPaso from "../../components/Pasos/SegundoPaso";
import TercerPaso from "../../components/Pasos/TercerPaso";
import { AuthContext } from "../../context/AuthContext";

export default function NuevoEvento() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { getCuentasBancarias, crearEvento, subirImagenEvento } = useContext(AuthContext);
  const [cuentaBancaria, setCuentaBancaria] = useState(null);
  const [loading, setLoading] = useState(false);

  // Avanzar de paso
  const handleNext = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  // Retroceder de paso
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Calcular capacidad total
  const calcularCapacidadTotal = (entradas) => {
    if (!entradas) return 0;
    return entradas.reduce((total, entrada) => total + (entrada.cantidad || 0), 0);
  };

  // Submit final
  const handleSubmit = async (finalStepData) => {
    const finalData = { ...formData, ...finalStepData };
    setLoading(true);

    try {
      // Objeto que espera el backend
      const evento = {
        nombre: finalData.nombre,
        descripcion: finalData.descripcion,
        inicioAt: new Date(finalData.inicioAt).toISOString(),
        finAt: new Date(finalData.finAt).toISOString(),
        cancelado: finalData.cancelado ?? false,
        lugar: finalData.lugar,
        entradas: finalData.entradas,
        cuentaBancariaId: finalData.cuentaBancariaId || 1,
        capacidadTotal: calcularCapacidadTotal(finalData.entradas),
      };

      // Paso 1: Crear evento
      const created = await crearEvento(evento);
      if (created.error) {
        console.error("Error creando evento:", created.error);
        return;
      }

      // Paso 2: Subir imágenes si existen
      if (finalData.banner || finalData.portada) {
        const formDataImages = new FormData();
        if (finalData.banner) formDataImages.append("banner", finalData.banner);
        if (finalData.portada) formDataImages.append("portada", finalData.portada);

        const updated = await subirImagenEvento(created.id, formDataImages);
      }
    } catch (err) {
      console.error("Error en handleSubmit:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar cuentas bancarias al inicio
  useEffect(() => {
    const fetchCuenta = async () => {
      try {
        const data = await getCuentasBancarias();
        setCuentaBancaria(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCuenta();
  }, []);

  if (!cuentaBancaria) return <p>Cargando datos de la cuenta bancaria...</p>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#010030] via-[#00033d] to-[#160078]">
      <Sidebar />
      <main className="flex-1 p-6 h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto ">
          <h2 className="text-3xl font-bold text-white mb-6">Nuevo evento</h2>

          {currentStep === 1 && (
            <PrimerPaso onNext={handleNext} initialData={formData} />
          )}

          {currentStep === 2 && (
            <SegundoPaso
              onNext={handleNext}
              onBack={handleBack}
              initialData={formData}
              cuentaBancaria={cuentaBancaria}
            />
          )}

          {currentStep === 3 && (
            <TercerPaso
              onBack={handleBack}
              onSubmit={handleSubmit}
              initialData={formData}
              loading={loading}
            />
          )}
        </div>
      </main>
    </div>
  );
}