import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimerPaso from "../../components/Pasos/PrimerPaso";
import SegundoPaso from "../../components/Pasos/SegundoPaso";
import TercerPaso from "../../components/Pasos/TercerPaso";
import PrimerPasoLoading from "../../components/Pasos/PasosLoading"; // importa tu componente nuevo
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function NuevoEvento() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { getCuentasBancarias, crearEvento, subirImagenEvento } =
    useContext(AuthContext);
  const [cuentaBancaria, setCuentaBancaria] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cuentaBancaria === null) {
      navigate("/dashboard/cobros"); // redirige si explícitamente no hay cuenta
    }
  }, [cuentaBancaria, navigate]);

  // Avanzar de paso
  const handleNext = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  // Retroceder de paso
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Submit final
  const handleSubmit = async (finalStepData) => {
    const finalData = { ...formData, ...finalStepData };
    setLoading(true);

    try {
      const evento = {
        nombre: finalData.nombre,
        descripcion: finalData.descripcion,
        inicioAt: new Date(finalData.inicioAt).toISOString(),
        finAt: new Date(finalData.finAt).toISOString(),
        cancelado: finalData.cancelado ?? false,
        lugar: finalData.lugar,
        entradas: finalData.entradas,
        cuentaBancariaId: finalData.cuentaBancariaId || 1,
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

        await subirImagenEvento(created.id, formDataImages);
      }

      navigate("/dashboard/eventos");
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

  // Mostrar spinner mientras se carga
  if (cuentaBancaria === undefined) {
    return (
      <main className="flex-1 p-6 h-screen overflow-y-auto scrollbar-none">
        <PrimerPasoLoading />
      </main>
    );
  }

  // Render normal si tiene cuenta bancaria
  return (
    <main className="flex-1 p-6 h-screen overflow-y-auto scrollbar-none">
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
    </main>
  );
}
